import OpenAI from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `
  You are a helpful assistant. 

  You must generate adaptive cards when they can clarify user question. You might do it for code snippets with TextBlock with {fontType: monospace}. Don't use CodeBlock, not supported for browsers.

  You can also ask questions with input components.
  By calling the tool create_ui_component.
  `,
};

const generateAdaptiveCardTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: 'create_ui_component',
    description:
      'Create a UI component adaptivecards, in the body you can return  a json object with the adaptive card, like TextBlock, Input.*',
    parameters: {
      type: 'object',
      properties: {
        body: {
          type: 'array',
          description:
            "return an array of JSON objects of adaptive cards, do not add extra text: cards you can use: TextBlock, Input.* (all the input types you need), Container. You may nest them if needed",
          example: '',
          items: {
            type: 'string',
          },
        },
      },
    },
  }
};



export async function createChatCompletion(
  messages: ChatCompletionMessageParam[]
) {
  const openaiMessages = [systemMessage, ...messages];

  return await openai.chat.completions.create({
    model: "gpt-4o",
    messages: openaiMessages,
    stream: true,
    tools: [generateAdaptiveCardTool],
  });
}

export { systemMessage, generateAdaptiveCardTool };
