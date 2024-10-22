date1=$(date '+%Y-%m-%d %H:%M:%S')

curl --location --request GET 'http://localhost:3001/api/v1/discovery-query' \
--header 'Content-Type: application/json' \
--data '{"query": "equity emissions Oil intensity in 2018"}' > result_$date1.json
