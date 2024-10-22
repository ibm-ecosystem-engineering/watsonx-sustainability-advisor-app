from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS

# import getpass
import os
import argparse
import logging 
import socket
from dotenv import load_dotenv

from handlers.fileUtil import FileUtil
from handlers.utils import CommonUtils
from handlers.llmHandler import LLMHandler
from handlers.discoveryHandler import discoveryHandler

app = Flask(__name__, static_folder='../../build', static_url_path='/')
CORS(app)

logging.basicConfig(
    format='%(asctime)s - %(levelname)s:%(message)s',
    handlers=[
        # RotatingFileHandler('logs.log',maxBytes=1000, backupCount=2),
        logging.StreamHandler(), #print to console
    ],
    level=logging.INFO
)

def checkDirectories():
    DATA_DIR = os.environ.get("DATA_PATH")
    print(DATA_DIR)
    VECTORDB_DIR = os.path.join(DATA_DIR, 'vectors')
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
    if not os.path.exists(VECTORDB_DIR):
        os.makedirs(VECTORDB_DIR)
    return DATA_DIR, VECTORDB_DIR

def init():
    load_dotenv()
    LOGLEVEL = os.environ.get('LOGLEVEL', 'WARNING').upper()

    DATA_DIR, VECTORDB_DIR = checkDirectories()
    utils.cache['CONFIG']['DATA_DIR'] = DATA_DIR
    utils.cache['CONFIG']['VECTORDB_DIR'] = VECTORDB_DIR
    utils.cache['CONFIG']['LOGLEVEL'] = LOGLEVEL
    global llmHandler
    llmHandler = LLMHandler(utils, file1)

    global discoveryHandler
    discoveryHandler = discoveryHandler(utils, file1)

@app.route('/api/v1/welcome', methods=['GET'])
def welcome_api():
    logging.info("welcome ...")
    resp = {"result": "Welcome to WatsonX API Gateway"}
    logging.info(resp)
    return resp, 200

# @app.route('/', methods=['GET'])
# def welcome_root():
#     logging.info("welcome_root ...")
#     resp = {"result": "Welcome to WatsonX API Gateway home"}
#     logging.info(resp)
#     return resp, 200

@app.route('/api/v1/discovery-query-multiple', methods=['POST'])
def discovery_query_multiple():
    file1.start()
    payload = request.get_json()
    resp = llmHandler.queryMultipleUsingDiscoveryAPI(payload)
    return resp, 200


@app.route('/api/v1/discovery-query-invoice', methods=['POST'])
def discovery_query_invoice():
    file1.start()
    payload = request.get_json()
    resp = llmHandler.queryInvoiceUsingDiscoveryAPI(payload)
    return resp, 200


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def index():
    return app.send_static_file('index.html')


def main():
  logging.info("main started .....")

  parser = argparse.ArgumentParser(
      formatter_class=argparse.ArgumentDefaultsHelpFormatter)
  parser.add_argument(
      '--chunk_size', help='chunk size', required=False, default=1000)
  parser.add_argument(
      '--chunk_overlap', help='chunk size', required=False, default=100)
  parser.add_argument(
      '--rag_dataset', help='Dataset path for RAG', required=False, default="retail")
  args = parser.parse_args()

  global CONFIG
  CONFIG = {}
  CONFIG['chunk_size'] = args.chunk_size
  CONFIG['chunk_overlap'] = args.chunk_overlap
  CONFIG['rag_dataset'] = args.rag_dataset
  global utils
  utils = CommonUtils()
  utils.cache['CONFIG'] = CONFIG
  global file1
  file1 = FileUtil(utils)
  
  init()

if __name__ == '__main__':
  main()
  app.run(host ='0.0.0.0', port = 3001, debug = True)