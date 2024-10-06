import OpenAI from "openai";
import { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `
  You are a helpful assistant. 

  You must generate adaptive cards at each user question. By calling the tool create_ui_component.
  Add also some text to explain that you are generating a UI component.
  `,
};

const generateAdaptiveCardTool: ChatCompletionTool = {
  type: "function",
  function: {
    name: "create_ui_component",
    description: "Create a UI component with title, text, and buttons",
    parameters: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "The title of the UI component"
        },
        text: {
          type: "string",
          description: "The main text content of the UI component"
        },
        buttons: {
          type: "array",
          items: {
            type: "object",
            properties: {
              label: {
                type: "string",
                description: "The label text for the button"
              },
              action: {
                type: "string",
                description: "The action to be performed when the button is clicked"
              }
            },
            required: ["label", "action"]
          },
          description: "An array of buttons for the UI component"
        }
      },
      required: ["title", "text"]
    }
  }
};

export async function createChatCompletion(messages: ChatCompletionMessageParam[]) {
  const openaiMessages = [systemMessage, ...messages];

  return await openai.chat.completions.create({
    model: "gpt-4o",
    messages: openaiMessages,
    stream: true,
    tools: [generateAdaptiveCardTool],
  });
}

export { systemMessage, generateAdaptiveCardTool };
