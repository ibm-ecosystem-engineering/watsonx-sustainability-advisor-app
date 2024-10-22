import os
import json
from langchain import PromptTemplate
from langchain.prompts.few_shot import FewShotPromptTemplate

import requests
import logging
from dotenv import load_dotenv
from cachetools import cached, TTLCache
from cachetools.keys import hashkey
from functools import partial
import asyncio
# from utils import CommonUtils
from handlers.utils import CommonUtils
from handlers.fileUtil import FileUtil

import requests
from evaluate import load
import pandas as pd
import os, getpass, json
from handlers.discoveryHandler import discoveryHandler

from ibm_cloud_sdk_core import IAMTokenManager

from langchain.docstore.document import Document
from langchain.chains.question_answering import load_qa_chain

#GENAI
from genai.extensions.langchain import LangChainInterface
from genai.schemas import GenerateParams
from genai.model import Credentials

# import getpass
import logging 
import os

class LLMHandler(object):

    cache = TTLCache(maxsize=100, ttl=86400)

    expected_schema = {
        "type": "object",
        "properties": {
                "data": {"type": "array"}
            },
        # Define additional schema constraints
    }
    
    def __init__(
        self,
        utils: CommonUtils,
        file1: FileUtil
    ) -> None:
        load_dotenv()
        self.utils = utils
        self.file1 = file1
        self.logger = logging.getLogger(__name__)
        # self.logger.setLevel(self.utils.cache['CONFIG']['LOGLEVEL'])
        self.db = None
        self.creds = None
        self.chain: load_qa_chain = None
        self.init_config()
        # self.load_documents()

    def init_config(self):
        GEN_API_KEY = os.getenv("GENAI_KEY", None)
        GEN_API_ENDPOINT = os.getenv("GENAI_API", None)
        if GEN_API_KEY is None or GEN_API_ENDPOINT is None:
            print("Either api_key or api_url is None. Please make sure your credentials are correct.")
        self.creds = Credentials(GEN_API_KEY, api_endpoint=GEN_API_ENDPOINT) # credentials object to access BAM
        self.init_langchain()
        self.discoveryHandler = discoveryHandler(self.utils, self.file1)

    def init_langchain(self):
        self.logger.info('In init_langchain: >> ')
        RAG_CONFIG = self.utils.getDefaultValue('RAG')
        # self.logger.info(f'RAG_CONFIG: >> {RAG_CONFIG}')
        model_llm = LangChainInterface(
            # model = "ibm/mpt-7b-instruct",
            model=RAG_CONFIG['model_id'],
            # model = ModelType.FLAN_UL2_20B,
            credentials=self.creds,
            params=GenerateParams(
                decoding_method="greedy",
                max_new_tokens=300,
                min_new_tokens=15,
                repetition_penalty=2,
                # stream = True,
            ).dict()
        )
        self.chain = load_qa_chain(model_llm, chain_type="stuff", verbose=True)
        self.logger.info(f'IN init_langchain, COMPLETED')
        return {"result": "SUCCESS"}

    def make_prompt2(self, context, payload, query, RAG_CONFIG):
        self.logger.info('  =============================== make_prompt2 Started =============================== >>>>> ')

        self.logger.debug(f'\n make_prompt2  query: : {query} \n\n')

        if "prompt" in query:
            prompt_template = query["prompt"]
        else:
            prompt_template = RAG_CONFIG['prompt']

        myQuestion = query["question"]
        prompt = ""
        prompt_for_display = ""

        if "examples" in query:
            ### Main Prompt
            PROMPT = PromptTemplate(
                template=prompt_template, input_variables=["context"]
            )
            prompt = PROMPT.format(context=context)
            prompt_for_display = prompt_template

            ### Example Prompt
            myExamples = query["examples"]
            example_prompt = PromptTemplate(template="Input: {input}\n{output}", input_variables=["input", "output"])
            example_prompt2 = FewShotPromptTemplate(
                examples=myExamples, 
                example_prompt=example_prompt,
                suffix="Input: {input}\n", 
                input_variables=["input"]
            )
            example_prompt_value = example_prompt2.format(input=myQuestion)
            self.logger.info(f'\n Example Prompt : : {example_prompt_value} \n\n')
        
            prompt = prompt + example_prompt_value
            prompt_for_display = prompt_for_display + example_prompt_value
        else:
            ### Main Prompt
            PROMPT = PromptTemplate(
                template=prompt_template, input_variables=["context", "question"]
            )
            prompt = PROMPT.format(context=context, question=myQuestion)
            prompt_for_display = prompt_template

            self.logger.info(f'\n Prompt : : {prompt} \n\n')

        query["llm_input"] = prompt_for_display
        return prompt

    def queryMultipleUsingDiscoveryAPI(self, payload: any):
        self.logger.info('  =============================== queryMultipleUsingDiscoveryAPI Started =============================== >>>>> ')

        self.logger.debug(f' Payload : {payload} \n\n')
        self.file1.writeInFileWithCounter("Payload.json", json.dumps(payload))

        RAG_CONFIG = self.utils.getDefaultValue('RAG')
        if 'model_id' in payload:
            modelId = payload['model_id']
        else:
            modelId = RAG_CONFIG['model_id']

        PROJECT_ID = os.getenv("PROJECT_ID", None)
        questions = payload['questions']
        dataset = payload['dataset']

        ### Confidence score using rouge
        rouge = load('rouge')

        filename_test = "./datasets/" + dataset + "/" + "est-test-data.csv";
        self.logger.debug(f'Test data to compare : {filename_test} ')
        test_data = pd.read_csv(filename_test)

        myindex=-1
        for query in questions:
            self.logger.info(f'\n Processing the query : {query} \n\n')

            COLLECTION_ID = query['collection-id']
            myQuestion = query["question"]
            myQuestionId = query["id"]

            if 'parameters' in query:
                parameters = query['parameters']
            else:
                parameters = RAG_CONFIG['parameters']

            self.file1.writeInFileWithCounter("myQuestion.txt", myQuestion)

            ## Load Passages from discovery
            context = self.discoveryHandler.load_passages_from_discovery(query, COLLECTION_ID)
            # context = context + "\n\n" + examples
            self.file1.writeInFileWithCounter("contextcontext.txt", context)

            ## Create Prompt Text
            promptText = self.make_prompt2(context, payload, query, RAG_CONFIG)
            self.logger.info('  Prompt Text ........................  ')
            self.logger.debug(f'\n promptText : {promptText} \n\n')
            self.file1.writeInFileWithCounter("promptText.txt", promptText)

            llmPayload = {
                "project_id": PROJECT_ID,
                "model_id": modelId, 
                "input": promptText,
                "parameters": parameters
                }

            self.logger.info('  ........................ Generate  Started ........................  ')

            ## Call IBM Generative AI APIs.
            jsonResp = self.call_generative_ai(llmPayload)

            # logging.info(response)
            if not 'results' in jsonResp or len(jsonResp['results']) == 0:
                self.logger.info('DATA NOT FOUND')
                resp = {"result": "I couldn't find that information."}
                query["response"] = "I couldn't find that information."
                self.logger.info(f"\n Error : I couldn't find that information. \n\n")
            else:
                generated_text = jsonResp["results"][0]["generated_text"]
                query["response"] = generated_text;
                # self.logger.info(f'\n generated_text : {generated_text} \n\n')
                self.file1.writeInFileWithCounter("generated_text.json", generated_text)

            ### Rogue Confidence Scores
            actualAnswer = query["response"];
            # expectedAnswer = test_data.iloc[myindex]['answers'];

            expectedAnswer = ""
            for index, row in test_data.iterrows():
                if (row['qid'] == myQuestionId) :
                    expectedAnswer = row['answers']
                    self.logger.info ("expected answer found........")
                    break
            
            scores = rouge.compute(predictions=[actualAnswer], references=[expectedAnswer])
            query["scores"] = scores;

            # self.logger.info('  ------------- Rogue Confidence Scores  ')
            # self.logger.debug(f'myQuestion : {myQuestion} ')
            # self.logger.debug(f'actualAnswer : {actualAnswer} ')
            # self.logger.debug(f'expectedAnswer : {expectedAnswer} ')
            self.logger.info(f'Rogue Confidence Scores : {scores} ')
            self.file1.writeInFileWithCounter("Scores.json", json.dumps(scores))

            self.logger.info('  ........................ Generate  Completed ........................  ')

        resp = {"result": questions}

        self.logger.info(' <<<<< =============================== queryMultipleUsingDiscoveryAPI Completed ===============================  ')
        return resp
    

    def queryInvoiceUsingDiscoveryAPI(self, payload: any):
        self.logger.info('  =============================== queryInvoiceUsingDiscoveryAPI Started =============================== >>>>> ')

        self.logger.debug(f' Payload : {payload} \n\n')
        self.file1.writeInFileWithCounter("Payload.json", json.dumps(payload))

        ## Load Passages from discovery
        context = self.discoveryHandler.load_invoice_from_discovery()

        self.file1.writeInFileWithCounter("context.json", json.dumps(context))

        self.logger.info(' <<<<< =============================== queryInvoiceUsingDiscoveryAPI Completed ===============================  ')
        return context    

    def call_generative_ai(self, llmPayload):
        GEN_API_KEY = os.getenv("GENAI_KEY", None)
        GEN_API_ENDPOINT = os.getenv("GENAI_API", None)

        access_token = IAMTokenManager(
            apikey = GEN_API_KEY,
            url = "https://iam.cloud.ibm.com/identity/token"
        ).get_token()

        ENDPOINT_URL = GEN_API_ENDPOINT
        self.logger.info(f'ENDPOINT_URL: {ENDPOINT_URL}')
        self.file1.writeInFileWithCounter("llmPayload.json", json.dumps(llmPayload))

        headers =  {"Content-Type":"application/json", "Accept": "application/json", "Authorization": "Bearer " +access_token}

        response = requests.post(ENDPOINT_URL, json=llmPayload, headers=headers)
        jsonResp = response.json()
        
        self.logger.debug(jsonResp)

        return jsonResp
    
        