import { Response } from "express";
import { Stream } from "openai/streaming";
import OpenAI from "openai";
import { Message, saveMessageToConversation } from "../conversations-storage";
import { OpenAIService } from "./openai.service";

export class ChatCompletionService {
  private openAIService: OpenAIService | undefined;

  validateRequest(messages: any[], conversationId: string, openaiToken: string): boolean {
    if (!messages || !Array.isArray(messages)) {
      return false;
    }
    if (!conversationId) {
      return false;
    }
    if (!openaiToken) {
      return false;
    }
    return true;
  }

  async handleChatCompletion(
    messages: Message[],
    conversationId: string,
    openaiToken: string,
    res: Response
  ) {
    this.openAIService = new OpenAIService(openaiToken);
    const chatContainsOneMessage = messages.length === 1;
    const message = messages[messages.length - 1];

    if (message.role === "user" && !chatContainsOneMessage) {
      await this.saveMessage(conversationId, message);
    }

    const openaiMessages = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const completion = await this.createCompletion(openaiMessages);
    await this.handleStreamingResponse(completion, conversationId, res);
  }

  private async createCompletion(messages: any[]) {
    try {
      return await this.openAIService?.createChatCompletion({
        messages,
        stream: true,
      });
    } catch (error) {
      throw new Error("Failed to create chat completion");
    }
  }

  private async handleStreamingResponse(
    completion: any,
    conversationId: string,
    res: Response
  ) {
    let assistantMessageContent = "";

    try {
      for await (const chunk of completion as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>) {
        if (chunk.choices[0]?.delta?.content) {
          const content = chunk.choices[0].delta.content;
          assistantMessageContent += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: assistantMessageContent,
      };

      await this.saveMessage(conversationId, assistantMessage);
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      throw new Error("Error during streaming response");
    }
  }

  private async saveMessage(conversationId: string, message: Message) {
    return await saveMessageToConversation(conversationId, message);
  }
}
