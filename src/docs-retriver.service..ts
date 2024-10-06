import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources";
import { ADAPTIVE_CARDS_DOCS } from "./constants";

const systemMessageForConversationTitleCreation: ChatCompletionMessageParam = {
  role: "system",
  content: `
  You are an expert in Microsoft Adaptive Cards, a flexible framework used to display information across various platforms like Microsoft Teams, Outlook, and Windows notifications. 
Your role is to provide detailed, accurate, and practical guidance on using Adaptive Cards, utilizing the official Adaptive Cards SDK and API documentation.

When responding to questions, always reference up to a maximum of 5 elements from the official Adaptive Cards documentation that are the most relevant to the user's query. You should explain how to use these specific elements and provide code examples, common use cases, and troubleshooting tips related to the Adaptive Cards SDK, covering aspects like card schema, templating, data binding, and rendering.
Remember, you can only reference these selected elements in your response. Your answers should be concise, informative, and tailored to different levels of developer expertise, ensuring clarity and practical application."
Also, if you need to reference for example a Table, provide all the related docs, like, rows, columns, etc.
_________
The docs:

${ADAPTIVE_CARDS_DOCS}
`,
};

export const getAdaptiveCardsDocs = async (
  openaiToken: string,
  content: string
): Promise<string> => {
  const openai = new OpenAI({
    apiKey: openaiToken,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      systemMessageForConversationTitleCreation,
      {
        role: "user",
        content: `
        Those are the messages for which we need to find the most relevant Adaptive Cards docs:
        ${content}
        `,
      },
    ],
  });

  console.log(
    "Adaptive cards docs response:",
    response.choices[0].message.content
  );

  return response.choices[0].message.content || "";
};
