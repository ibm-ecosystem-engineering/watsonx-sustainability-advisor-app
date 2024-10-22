
import os
import logging
from datetime import datetime
from dotenv import load_dotenv

from handlers.utils import CommonUtils

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


class FileUtil(Singleton):

    def __init__(
        self,
        utils: CommonUtils
        ) -> None:
        load_dotenv()
        self.couner = 0
        self.utils = utils
        self.timestampString = ""
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel("INFO")

    def writeInFile(self, fileName, fileText):
        file = open(fileName,"w")
        file.write(fileText)
        file.close()
        return None
    
    def start(self):
        self.counter = 0
        self.timestampString = self.getCurrentTimeString()

    def writeInFileWithCounter(self, fileName, fileText):

        self.counter = self.counter + 1    
        fileNamePrefix = str(self.counter).zfill(4) + "-"

        rootFolder = "output"
        folderName = "results-" + self.timestampString

        filePath = os.path.join(rootFolder, folderName)


        ### Create folder
        try:
            os.mkdir(rootFolder)
            self.logger.debug("Folder %s created!" % rootFolder)
        except Exception as e:
            self.logger.debug(f' Error in creating folder : {e} ')
        try:
            os.mkdir(filePath)
            self.logger.debug("Folder %s created!" % filePath)
        except Exception as e:
            self.logger.debug(f' Error in creating folder : {e} ')

        ### Create folder
        fileNameWithPath = os.path.join(filePath, fileNamePrefix + fileName)
        self.logger.debug("fileNameWithPath :" + fileNameWithPath)
        self.writeInFile(fileNameWithPath, fileText)

        return None

    def getCurrentTimeString(self):
        now = datetime.now() 
        date_time = now.strftime("%m%d%Y-%H%M%S-%f")
        self.logger.debug("getCurrentTimeString :",date_time)
        return date_time
