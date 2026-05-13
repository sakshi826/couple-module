import os
import requests
from dotenv import load_dotenv

load_dotenv()

def test_google_translate_api():
    api_key = os.getenv('GOOGLE_TRANSLATOR_KEY')
    endpoint = 'https://translation.googleapis.com/language/translate/v2'
    
    if not api_key:
        print("Error: AZURE_TRANSLATOR_KEY not found in .env")
        return

    print(f"Testing Google Translate API with key: {api_key[:10]}...")
    
    try:
        response = requests.post(
            endpoint,
            params={'key': api_key},
            json={
                'q': 'Hello world',
                'target': 'es',
                'format': 'text'
            }
        )
        
        if response.status_code == 200:
            data = response.json()
            translation = data['data']['translations'][0]['translatedText']
            print(f"Success! 'Hello world' -> Spanish: '{translation}'")
            return True
        else:
            print(f"API Error (Status {response.status_code}):")
            print(response.text)
            return False
            
    except Exception as e:
        print(f"Connection Error: {e}")
        return False

if __name__ == "__main__":
    test_google_translate_api()
