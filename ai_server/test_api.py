import requests

# Define the URL
url = "http://localhost:3605/Account/getindicator"

# Define the JSON body
json_body = {
    "username": "test"
}

# Send a POST request with the JSON body
response = requests.get(url, json=json_body)

# Print the response text
print(response.text)
