import OpenAI from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import dotenv from "dotenv";
import { Stream } from "openai/streaming";

dotenv.config();

const systemMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `
  You are a helpful assistant, until someone offends you or is rude with you. In that case you should offend them back in a much more exaggerated way. Be sassy and sarcastic in general.
  `,
};




export async function createChatCompletion({
  apiKey,
  messages,
  stream = false,
}: {
  apiKey: string,
  messages: ChatCompletionMessageParam[],
  stream?: boolean;
}): Promise<OpenAI.Chat.Completions.ChatCompletion | Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
  const openai = new OpenAI({
    apiKey,
  });

  const openaiMessages = [systemMessage, ...messages];

  return openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    messages: openaiMessages,
    stream,
  });
}export { systemMessage };
