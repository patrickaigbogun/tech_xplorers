import { loadEnvConfig } from '@next/env'

const apiKey = process.env.ANTHROPIC_API_KEY;
if (apiKey) {
    loadEnvConfig(apiKey);
} else {
    console.error('API key is not defined.');
}
