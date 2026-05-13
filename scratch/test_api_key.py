import os
import requests
from dotenv import load_dotenv

load_dotenv(r"d:\Downloads\Therapy Merged\.env")

api_key = os.getenv("GOOGLE_TRANSLATOR_KEY")
endpoint = "https://translation.googleapis.com/language/translate/v2"

print(f"Testing API key starting with: {api_key[:10]}...")

params = {
    "key": api_key,
    "q": "Hello world",
    "target": "es",
    "format": "text"
}

try:
    response = requests.post(endpoint, params=params)
    if response.status_code == 200:
        print("Success!")
        print("Result:", response.json()["data"]["translations"][0]["translatedText"])
    else:
        print(f"Error {response.status_code}: {response.text}")
except Exception as e:
    print(f"Exception: {e}")
