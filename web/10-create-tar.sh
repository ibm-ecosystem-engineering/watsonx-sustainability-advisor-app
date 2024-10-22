#!/usr/bin/env bash
date1=$(date '+%Y-%m-%d-%H-%M-%S')

echo "==================================================================="
echo "Copying  : Process started : " + $date1
echo "==================================================================="

TEMP_FOLDER1=temp-$date1
TEMP_FOLDER2=${TEMP_FOLDER1}/watsonx-sustainability-advisor-ui
mkdir -p ${TEMP_FOLDER2}

cp -R src $TEMP_FOLDER2
cp -R public $TEMP_FOLDER2
cp -R logo.svg $TEMP_FOLDER2
cp -R package.json $TEMP_FOLDER2

cd ${TEMP_FOLDER1}
tar -cvf watsonx-sustainability-advisor-ui.tar .

cd ..
cp ${TEMP_FOLDER1}/watsonx-sustainability-advisor-ui.tar .

date1=$(date '+%Y-%m-%d-%H-%M-%S')
echo "==================================================================="
echo "Copying: Process completed : " + $date1
echo "==================================================================="
