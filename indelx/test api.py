import requests

response = requests.get('https://www.getfromnepal.com/productapi')
print(response.status_code)  # Print the HTTP status code
print(response.json())