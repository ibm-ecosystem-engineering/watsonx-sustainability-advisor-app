import os
import logging
from xml.dom.minidom import Document 
from dotenv import load_dotenv

from typing import Dict, Optional, Any, Iterable, List
import uuid

# import getpass
import logging 
import os, json

from handlers.utils import CommonUtils
from handlers.fileUtil import FileUtil

from ibm_watson import DiscoveryV2
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

class discoveryHandler(object):

    def __init__(
        self,
        utils: CommonUtils,
        file1: FileUtil
    ) -> None:
        self.utils = utils
        self.file1 = file1
        load_dotenv()
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(self.utils.cache['CONFIG']['LOGLEVEL'])
        self.init_config()

    def init_config(self):
        WD_API_KEY = os.getenv("WD_API_KEY", None)
        WD_SERVICE_URL = os.getenv("WD_SERVICE_URL", None)
        WD_PROJECT_ID = os.getenv("WD_PROJECT_ID", None)

        print("WD_SERVICE_URL ........: {0}".format(WD_SERVICE_URL))
        print("WD_PROJECT_ID ........: {0}".format(WD_PROJECT_ID))

        global discovery
        # Create client 
        try:
            authenticator = IAMAuthenticator(WD_API_KEY)
            discovery = DiscoveryV2(
                version='2020-08-30',
                authenticator=authenticator
                )
            discovery.set_service_url(WD_SERVICE_URL)

        except Exception as e:
            print("Unable to connect to discovery: {0}".format(e))

    def load_passages_from_discovery(self, query, COLLECTION_ID):
        self.logger.info('--------------------- Load Documents from Discovery started --------------------- >>>>> ')
        self.logger.debug('Query          :  ' + json.dumps(query))

        myQuestion = query["question"]
        WD_PROJECT_ID = os.getenv("WD_PROJECT_ID", None)
        WD_COLLECTION_IDS = os.getenv("WD_COLLECTION_ID_" + COLLECTION_ID, None)
        WD_COUNT = os.getenv("WD_COUNT", None)

        # global discovery
        self.logger.info(f' Discovery Query : {myQuestion} \n\n')
        
        self.logger.info('before querying')

        result_passages = ""
        result_passages_short = ""
        filenames = ""
        try:
            discovery_results = discovery.query(
                    project_id = WD_PROJECT_ID,
                    natural_language_query= myQuestion,
                    collection_ids= [WD_COLLECTION_IDS],
                    count = WD_COUNT
                ).get_result()

            self.logger.info('Querying completed')

            self.logger.info(f'Total documents : {len(discovery_results["results"])}')

            self.file1.writeInFileWithCounter("discovery-result.json", json.dumps(discovery_results["results"]))

            for result in discovery_results["results"]:
                self.logger.info(f'Total passages ... : {len(result["document_passages"])}')
                filenames = filenames + "  " + result['extracted_metadata']['filename']

                for passage in result['document_passages']:
                    passage_text = passage['passage_text']
                    self.logger.debug(f'passage_text ... : {passage_text}')
                    self.file1.writeInFileWithCounter("passage_text.txt", passage_text)
                    result_passages = result_passages + "\n\n" + passage_text

                    if (len(result_passages_short) > 0):
                        result_passages_short = result_passages_short + "\n\n ------------------------------------------------------------------------------------------------------------------------------\n\n"
                    result_passages_short = result_passages_short + "{:.500}".format(passage_text)

            query["discovery_result"] = result_passages_short
            query["discovery_source"] = filenames
            self.logger.info(f' discovery_source : {filenames} \n\n')

        except Exception as e:
            self.logger.info(f' Unable to load passages from discovery : {e} \n\n')

        self.logger.debug(f' Result : {result_passages} \n\n')
        self.file1.writeInFileWithCounter("result_passages.txt", result_passages)

        self.logger.info(' <<<<< --------------------- Load Documents from Discovery completed --------------------- ')
        return result_passages
    
    def load_invoice_from_discovery(self):
        self.logger.info('--------------------- Load Invoice from Discovery started --------------------- >>>>> ')

        myQuestion = ""
        WD_PROJECT_ID = os.getenv("WD_PROJECT_ID", None)
        WD_COLLECTION_IDS = os.getenv("WD_COLLECTION_IDS" , None)
        WD_COUNT = os.getenv("WD_COUNT", None)

        # global discovery
        self.logger.info(f' Discovery Query : {myQuestion} \n\n')
        
        self.logger.info('before querying')

        result_passages = ""
        try:
            discovery_results = discovery.query(
                    project_id = WD_PROJECT_ID,
                    natural_language_query= myQuestion,
                    collection_ids= [WD_COLLECTION_IDS],
                    count = WD_COUNT
                ).get_result()

            self.logger.info('Querying completed')

            self.logger.info(f'Total documents : {len(discovery_results["results"])}')

            self.file1.writeInFileWithCounter("discovery-result.json", json.dumps(discovery_results["results"]))
        except Exception as e:
            self.logger.info(f' Unable to load passages from discovery : {e} \n\n')

        my_list = []

        try:
            for item in discovery_results["results"]:
                self.logger.info(f' item  -----> : {item}')

                my_item = {}
                my_item["document_id"] = item["document_id"] 
                my_item["my-total-cost"] = item["my-total-cost"] 
                my_item["my-billing-date"] = item["my-billing-date"] 
                my_item["my-qty"] = item["my-qty"] 
                my_list.append(my_item)

            self.file1.writeInFileWithCounter("result.json", json.dumps(my_list))
        except Exception as e:
            self.logger.info(f' Unable to process discovery result : {e} \n\n')

        result = {}
        result["result"] = my_list 
        self.logger.info(' <<<<< --------------------- Load Invoice from Discovery completed --------------------- ')
        return result    