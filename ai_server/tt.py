import requests

# Define the URL for the GET request
url_get = "http://localhost:3605/Account/getindicator"

# Define the JSON body
json_body = {
    "username": "test"
}

# Send a GET request
response = requests.get(url_get, json=json_body)
print(response.text)