curl --location --request GET 'http://localhost:3001/api/v1/downloadfile' \
    --header 'Content-Type: application/json' \
    --data \
        '{   
        "bucket_name": "watsonx-envizi",
        "bucket_file_name": "IBM_2021_ESG_Report-short.pdf",
        "local_file_name": "/Users/gandhi/GandhiMain/990-Temp/IBM_2021_ESG_Report-short.pdf"
        }'
