import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const API_KEY = process.env.GOOGLE_TRANSLATOR_KEY;
const OFFICIAL_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';
const FREE_ENDPOINT = 'https://translate.googleapis.com/translate_a/single';

const textToTranslate = 'Hello, world!';
const targetLanguages = ['es', 'fr', 'hi', 'de', 'ja'];

async function testOfficialAPI() {
  console.log('--- 1. Testing Official Google Cloud Translation API ---');
  if (!API_KEY) {
    console.error('Error: GOOGLE_TRANSLATOR_KEY is not defined in your .env file.\n');
    return false;
  }
  
  console.log(`Using API Key: ${API_KEY.slice(0, 8)}... (truncated)`);
  console.log(`Original Text: "${textToTranslate}"\n`);
  
  let allSuccess = true;
  for (const lang of targetLanguages) {
    try {
      console.log(`Translating to [${lang}] via Official API...`);
      const response = await axios({
        url: OFFICIAL_ENDPOINT,
        method: 'POST',
        params: { key: API_KEY },
        data: {
          q: [textToTranslate],
          target: lang,
          format: 'text'
        }
      });
      
      const translations = response.data.data.translations;
      if (translations && translations.length > 0) {
        console.log(`Result [${lang}]: "${translations[0].translatedText}"\n`);
      } else {
        console.log(`Result [${lang}]: No translation returned.\n`);
        allSuccess = false;
      }
    } catch (error) {
      console.error(`Error translating to [${lang}]:`, error.response?.data?.error?.message || error.message);
      console.log();
      allSuccess = false;
    }
  }
  return allSuccess;
}

async function testFreeAPI() {
  console.log('--- 2. Testing Free Google Translate Endpoint (Fallback) ---');
  console.log(`Original Text: "${textToTranslate}"\n`);
  
  for (const lang of targetLanguages) {
    try {
      console.log(`Translating to [${lang}] via Public API...`);
      
      const response = await axios({
        url: FREE_ENDPOINT,
        method: 'GET',
        params: {
          client: 'gtx',
          sl: 'auto',
          tl: lang,
          dt: 't',
          q: textToTranslate
        }
      });
      
      // The response is an array: [[["translated_text", "original_text", null, null, 1]], null, "source_lang"]
      const translatedText = response.data?.[0]?.[0]?.[0];
      if (translatedText) {
        console.log(`Result [${lang}]: "${translatedText}"\n`);
      } else {
        console.log(`Result [${lang}]: Could not parse response.\n`);
      }
    } catch (error) {
      console.error(`Error translating to [${lang}] via Public API:`, error.message);
      console.log();
    }
  }
}

async function runTests() {
  const officialSuccess = await testOfficialAPI();
  console.log('\n=========================================\n');
  await testFreeAPI();
}

runTests();
