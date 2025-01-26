import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';
dotenv.config();

//Go with the documentation
export const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
});

// export const initializeAnthropic = async () => {
//   try {
//     //client.messages.stream is the method to interact with the API in stream mode
//     //Also can use client.messages.create to interact with the API in request-response mode
//     await anthropic.messages
//       .stream({
//         model: 'claude-3-5-sonnet-20241022',
//         max_tokens: 1024,
//         system: getSystemPrompt(),
//         messages: [
//           { role: 'user', content: BEAUTIFY_PROMPT },
//           { role: 'user', content: DEFAULT_USER_TEMPLATE_PROMPT },
//           { role: 'user', content: 'Create a simple todo app' },
//         ],
//       })
//       .on('text', (text) => {
//         console.log(text);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// };
