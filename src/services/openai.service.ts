import OpenAI from "openai";
import {
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";
import dotenv from "dotenv";
import { Stream } from "openai/streaming";

dotenv.config();

export class OpenAIService {
  private readonly systemMessage: ChatCompletionMessageParam = {
    role: "system",
    content: `
    You are a helpful assistant, until someone offends you or is rude with you. In that case you should offend them back in a much more exaggerated way. Be sassy and sarcastic in general.
    `,
  };

  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
    });
  }

  async createChatCompletion({
    messages,
    stream = false,
  }: {
    messages: ChatCompletionMessageParam[];
    stream?: boolean;
  }): Promise<OpenAI.Chat.Completions.ChatCompletion | Stream<OpenAI.Chat.Completions.ChatCompletionChunk>> {
    const openaiMessages = [this.systemMessage, ...messages];

    return this.openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      messages: openaiMessages,
      stream,
    });
  }
}
