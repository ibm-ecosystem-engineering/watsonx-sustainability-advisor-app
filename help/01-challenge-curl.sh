curl "https://us-south.ml.cloud.ibm.com/ml/v1-beta/generation/text?version=2023-05-29" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -d $'{
  "model_id": "ibm/mpt-7b-instruct2",
  "input": "Input:\\nDescribe the communications and training provided by company on anti-corruption policies and procedures\\n\\nOutput:\\nOur approach to anti-corruption is based on the Code of Conduct, which clearly prohibits bribery and corruption. Compliance with the Code of Conduct as an integral part of the employment contract and the onboarding program is the personal responsibility of each of our employee. In addition, they are trained at least once a year. Corporate Legal, Internal Audit and Corporate Compliance team functions regularly conduct training sessions and audits. General Managers are responsible for the compliance of their companies with applicable laws, internal regulation, including the Code of Conduct, and for the information and training of their staff..\\n\\nInput:\\nHow company trains the employees and business partners , stakeholders on anti-corruption policies and procedures\\n\\nOutput:\\n100% of our global management committee and 99% of our people and our managing directors completed our required Ethics and Compliance training in fiscal 2021. There was no meaningful difference between Markets in these completion rates. Additionally, we had similar completion rates for those required to take our course on anti-corruption. Refer to “Our Company – Supply chain” and “Our Company – Ethics & governance” in our United Nations Global Compact: Communication on Progress 2021 for more information on training, including contractors and suppliers\\n\\nInput:\\nHow IBM share and train  Employees and business partners on anti-corruption policies and procedures ?\\n\\nOutput:\\n",
  "parameters": {
    "decoding_method": "greedy",
    "max_new_tokens": 20,
    "min_new_tokens": 0,
    "stop_sequences": [],
    "repetition_penalty": 1
  },
  "project_id": "2677a1e4-292a-43e4-9681-33eb77a797fe"
}'

curl "https://us-south.ml.cloud.ibm.com/ml/v1-beta/generation/text?version=2023-05-29" \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -d $'{
  "model_id": "ibm/mpt-7b-instruct2",
  "input": "Input:\\nthe transparency report states we ve designed the signal service to minimize the data we retain about signal users so the only information we can produce in response to a request like this is the date and time a user registered with signal and the last date of a user s connectivity to the signal service.\\n\\nOutput:\\nthis service does not track you.\\n\\nInput:\\nyou own all of the content and information you post on facebook and you can control how it is shared through your privacy and application settings. in addition for content that is covered by intellectual property rights like photos and videos ip content you specifically give us the following permission subject to yourprivacy and application settings you grant us a non exclusive transferable sub licensable royalty free worldwide license to use any ip content that you post on or in connection with facebook ip license. this ip license ends when you delete your ip content or your account unless your content has been shared with others and they have not deleted it. when you delete ip content it is deleted in a manner similar to emptying the recycle bin on a computer. however you understand that removed content may persist in backup copies for a reasonable period of time but will not be available to others when you use an application the application may ask for your permission to access your content and information as well as content and information that others have shared with you. we require applications to respect your privacy and your agreement with that application will control how the application can use store and transfer that content and information. to learn more about platform including how you can control what information other people may share with applications read our data use policy and platform page. when you publish content or information using the public setting it means that you are allowing everyone including people off of facebook to access and use that information and to associate it with you i e your name and profile picture.\\n\\nOutput:\\nfacebook can use stuff that you post on or in connection with facebook that you have intellectual property rights to. facebook loses rights to your stuff if you delete it or your account so long as others have not shared without later deleting your stuff. publishing stuff using the public setting gives everyone else rights to that stuff.\\n\\nInput:\\nto the extent permitted by applicable law you agree to defend indemnify and hold harmless company and its affiliates from and against all claims damages obligations losses liabilities costs debt or expenses including but not limited to attorneys fees arising from a your use and access of the service. b your violation of any term of this agreement. your violation of any third party right including without limitation any copyright trademark property or privacy right. d any claim that your submitted content caused damage to a third party.\\n\\nOutput:\\ndefend indemnify hold harmless survives termination.\\n\\nInput:\\nmodifications to service discogs reserves the right to modify or discontinue the service with or without notice to you. discogs shall not be liable to you or any third party should discogs exercise tos right to modify or discontinue the service.\\n\\nOutput:\\n",
  "parameters": {
    "decoding_method": "greedy",
    "max_new_tokens": 20,
    "min_new_tokens": 0,
    "stop_sequences": [],
    "repetition_penalty": 1
  },
  "project_id": "2677a1e4-292a-43e4-9681-33eb77a797fe"
}'