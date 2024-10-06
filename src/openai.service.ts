import OpenAI from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import dotenv from "dotenv";

dotenv.config();

const systemMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `
  You are a helpful assistant. 

  You must generate cards when asked to.
  In all the other cases respond with the text.

  You might ask questions with input components time to time.
  By calling the tool create_adaptive-cards you will create adaptive cards. Please refer to the documentation provided, use ONLY the cards from the provided documentation.
  `,
};

const generateAdaptiveCardTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: 'create_adaptive-cards',
    description:
      'Create Adaptivecards, you can return a json object with the adaptive card payload',
    parameters: {
      type: 'object',
      properties: {
        cardData: {
          type: 'string',
          description:
            'return an array of JSON objects of adaptive cards, do not add extra text. Include version, type, body. Escape the double quotes and special chars with a backslash.',
        },
      },
    },
  }
};



export async function createChatCompletion(
  apiKey: string,
  messages: ChatCompletionMessageParam[],
  additionalSystemMessage: string = ""
) {
  const openai = new OpenAI({
    apiKey,
  });

  const openaiMessages = [systemMessage, {role: 'system', content: additionalSystemMessage} as ChatCompletionMessageParam, ...messages];

  return await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0,
    messages: openaiMessages,
    stream: true,
    tools: [generateAdaptiveCardTool],
  });
}

export { systemMessage, generateAdaptiveCardTool };
