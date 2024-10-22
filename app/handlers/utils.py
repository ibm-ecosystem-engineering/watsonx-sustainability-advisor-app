
import os
import json
import socket
import requests
import logging
from flask import Flask, render_template, json, current_app as app

class Singleton(object):
        def __new__(cls, *args, **kwds):
            it = cls.__dict__.get("__it__")
            if it is not None:
                return it
            cls.__it__ = it = object.__new__(cls)
            it.init(*args, **kwds)
            return it
        def init(self, *args, **kwds):
            pass


class CommonUtils(Singleton):

    def __init__(self) -> None:
        """ Initialize CommonUtils """
        self.cache = {
            'UPDATES': False,
            'CONFIG': {}
        }
    
    def setInCache(self, key, value):
        self.cache[key] = value

    def getFromCache(self, key):
        return self.cache[key]
    
    def getDefaultValue(self, key):
        with open(os.path.join('./app', 'config',"llm-config.json"), "r") as config_file:
            data = json.load(config_file)   
            # print(data)   
            if key in data:
                print('Key exists in Config data')
                return data[key]
            else:
                return None



