#!/usr/bin/env bash
date1=$(date '+%Y-%m-%d-%H-%M-%S')

echo "==================================================================="
echo "Copying watsonx-sustainability-advisor- to VM : Process started : " + $date1
echo "==================================================================="

## Define folder and file names
PROCESS_FOLDER=/Users/gandhi/GandhiMain/990-Temp/$date1-temp
SRC_FOLDER_UI=/Users/gandhi/GandhiMain/700-Apps/watsonx-sustainability-advisor-ui

VM_IPADDRESS=ESG-advisor1.fyre.ibm.com
VM_FOLDER=/root/esg
VM_FOLDER_BACKUP=/root/esg/backup/ui-$date1

SCRIPT_TAR_FILE_NAME=watsonx-sustainability-advisor-ui.tar
SCRIPT_TAR_FILE_NAME_ONLY=watsonx-sustainability-advisor-ui

PROCESS_FOLDER_SUB=$PROCESS_FOLDER/$SCRIPT_TAR_FILE_NAME_ONLY

echo "------------------- 1 -----------------------"
echo "Process folder        : $PROCESS_FOLDER"
echo "Target folder         : $VM_FOLDER"
echo "Target Backup folder  : $VM_FOLDER_BACKUP"
echo "Target VM             : $VM_IPADDRESS"
echo "Tar file              : $SCRIPT_TAR_FILE_NAME"
echo "------------------------------------------"


echo "create process folder .........."
mkdir -p $PROCESS_FOLDER_SUB
cd $PROCESS_FOLDER

## copy UI files
echo "copy UI files .........."
cp -R $SRC_FOLDER_UI/src $PROCESS_FOLDER_SUB
cp -R $SRC_FOLDER_UI/public $PROCESS_FOLDER_SUB
cp $SRC_FOLDER_UI/package.json $PROCESS_FOLDER_SUB

## Create Tar file in Local
echo "create Tar file .........."
tar -cvf ${SCRIPT_TAR_FILE_NAME} .
chmod 777  ${SCRIPT_TAR_FILE_NAME}

echo "------------------- 2 -----------------------"
echo "Tar file created in local"
ls -l
echo "------------------------------------------"


## Create Target folder in VM
echo "------------------- 3 -----------------------"
echo "Create Target and backup folder in VM"
echo "------------------------------------------"
ssh root@${VM_IPADDRESS} << EOF
    mkdir -p ${VM_FOLDER_BACKUP}
    mv ${VM_FOLDER}/${SCRIPT_TAR_FILE_NAME_ONLY} ${VM_FOLDER_BACKUP}
    mkdir -p ${VM_FOLDER}
EOF

## Copy Tar file to Target folder in VM
echo "------------------- 4 -----------------------"
echo "Copy file to Target folder in VM "
echo "------------------------------------------"
scp $SCRIPT_TAR_FILE_NAME root@${VM_IPADDRESS}:${VM_FOLDER}

## UnTar the tar file in VM
echo "------------------- 4 -----------------------"
echo " UnTar the tar file in VM "
ssh root@${VM_IPADDRESS} << EOF
    cd ${VM_FOLDER}
    ls -l
    rm -rf ${SCRIPT_TAR_FILE_NAME_ONLY}
    tar -xvf ${SCRIPT_TAR_FILE_NAME}
    pwd
    ls -l
    cd ${VM_FOLDER}/${SCRIPT_TAR_FILE_NAME_ONLY}
    pwd
    ls -l   
EOF
echo "------------------------------------------"

date1=$(date '+%Y-%m-%d-%H-%M-%S')
echo "==================================================================="
echo "Copying watsonx-sustainability-advisor- to VM : Process completed : " + $date1
echo "==================================================================="
