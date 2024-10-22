#!/usr/bin/env bash
date1=$(date '+%Y-%m-%d-%H-%M-%S')

echo "==================================================================="
echo "Copying  : Process started : " + $date1
echo "==================================================================="

scp watsonx-sustainability-advisor-ui.tar root@ESG-advisor1.fyre.ibm.com:~/esg/

date1=$(date '+%Y-%m-%d-%H-%M-%S')
echo "==================================================================="
echo "Copying: Process completed : " + $date1
echo "==================================================================="
