date1=$(date '+%Y-%m-%d %H:%M:%S')

curl --location --request POST 'http://localhost:3001/api/v1/discovery-query-multiple' \
--header 'Content-Type: application/json' \
--data '@GRI-Questionaire.json' > result_$date1.json
