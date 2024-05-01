import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.ANTHROPIC_API_KEY;

const anthropic = new Anthropic({
  apiKey: apiKey, // Replace with your API key
});

export const sendToClaude = async (userMessage: string): Promise<string> => {
  try {
    const msg: any = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      temperature: 0,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userMessage,
            },
          ],
        },
      ],
    });

    // Extract and return Claude's response
    const response = msg.messages[0].content[0].text;
    return response;
  } catch (error) {
    console.error("An error occurred while sending message to Claude:", error);
    return "I'm sorry, there was an error processing your request.";
  }
};
