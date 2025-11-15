import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

<<<<<<< HEAD
=======
// Check if API key is configured
const apiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!apiKey) {
  console.warn('⚠️  GOOGLE_GENAI_API_KEY is not set. AI features will not work.');
  console.warn('   Please set GOOGLE_GENAI_API_KEY in your .env file.');
  console.warn('   Get your API key from: https://aistudio.google.com/apikey');
}

>>>>>>> 306ebb3 (Initial commit: Hospital management system files)
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
