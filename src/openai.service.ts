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

  You must generate adaptive cards when they can clarify user question. You might do it for code snippets with TextBlock with {fontType: monospace}. Don't use CodeBlock, not supported for browsers.

  You can also ask questions with input components.
  By calling the tool create_adaptive-cards you will create adaptive cards. Please refer to the documentation provided, use ONLY the cards from the documentation.
  `,
};

const generateAdaptiveCardTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: 'create_adaptive-cards',
    description:
      'Create Adaptivecards, you can return a json object with the adaptive cards payload',
    parameters: {
      type: 'object',
      properties: {
        body: {
          type: 'string',
          description:
            "return an array of JSON objects of adaptive cards, do not add extra text. Include version, type, body",
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
