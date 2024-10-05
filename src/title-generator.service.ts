import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

const systemMessageForConversationTitleCreation: ChatCompletionMessageParam = {
  role: "system",
  content: `
  You a conversation title creator. You'll get a conversation message and you should create a title for the conversation.
  The title should be a short sentence, no more than 6 words.
  Just return the title, no other text.
  Example:

  user: "What's the best way to learn React? I tried several tutorials but really bad at it."
  assistant: "React learning tips"
  `,
};

export const generateConversationTitle = async (content: string): Promise<string> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      systemMessageForConversationTitleCreation,
      {
        role: "user",
        content: content,
      },
    ],
  });

  return response.choices[0].message.content || "New  conversation";
};
