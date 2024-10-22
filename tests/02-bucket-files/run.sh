curl --location --request GET 'http://localhost:3001/api/v1/bucket_files' \
    --header 'Content-Type: application/json' \
    --data \
        '{   
        "bucket_name": "watsonx-envizi"
        }'