// Ailogic.tsx
import Anthropic from "@anthropic-ai/sdk";


const sendToClaude = async (userMessage: string, _apiKey: string): Promise<string> => {
  const anthropic = new Anthropic({
    apiKey: process.env.NEXT_PUBLIC_oti4, // Use the apiKey passed as an argument
  });

  try {
    const msg: any = await anthropic.messages.create({
      model: "Claude 3 Opus 20240229",
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

export default sendToClaude;