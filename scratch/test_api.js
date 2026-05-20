import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const API_KEY = process.env.GOOGLE_TRANSLATOR_KEY;
const ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';

async function testTranslation() {
    if (!API_KEY) {
        console.error("Error: GOOGLE_TRANSLATOR_KEY not found in .env file.");
        return;
    }

    console.log("Testing API Key...");
    
    try {
        const response = await axios({
            url: ENDPOINT,
            method: 'post',
            params: { key: API_KEY },
            data: {
                q: ["Hello World"],
                target: "es",
                format: 'text'
            }
        });

        const translatedText = response.data.data.translations[0].translatedText;
        console.log(`Success! "Hello World" in Spanish: ${translatedText}`);
        
        const responseFr = await axios({
            url: ENDPOINT,
            method: 'post',
            params: { key: API_KEY },
            data: {
                q: ["Hello World"],
                target: "fr",
                format: 'text'
            }
        });
        
        console.log(`Success! "Hello World" in French: ${responseFr.data.data.translations[0].translatedText}`);

    } catch (error) {
        console.error("API Key Test Failed!");
        console.error("Status:", error.response?.status);
        console.error("Message:", error.response?.data?.error?.message || error.message);
    }
}

testTranslation();
