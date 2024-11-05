import { Request, Response } from "express";
import { ConversationService } from "../services/conversation.service";
import { ChatCompletionService } from "../services/chat-completion.service";

export class ConversationController {
  constructor(
    private conversationService: ConversationService,
    private chatCompletionService: ChatCompletionService
  ) {}

  async createConversation(req: Request, res: Response) {
    if (!req.body.userMessage) {
      return res.status(400).json({ error: "Missing userMessage in request body" });
    }
    const openaiToken = req.headers["x-openai-token"] as string;
    if (!openaiToken) {
      return res.status(401).json({ error: "OpenAI token is required" });
    }

    try {
      const { userMessage } = req.body;
      const conversation = await this.conversationService.createNewConversation(openaiToken, userMessage);
      res.status(201).json({ id: conversation.id });
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ error: "Failed to create conversation" });
    }
  }

  async getConversation(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const conversation = await this.conversationService.getConversationById(id);
      if (conversation) {
        res.json(conversation);
      } else {
        res.status(404).json({ error: "Conversation not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve conversation" });
    }
  }

  async getAllConversations(req: Request, res: Response) {
    try {
      const conversations = await this.conversationService.getAllConversations();
      res.json(conversations);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve conversations" });
    }
  }

  async streamChatCompletion(req: Request, res: Response) {
    const { messages, conversationId } = req.body;
    const openaiToken = req.headers["x-openai-token"] as string;

    if (!this.chatCompletionService.validateRequest(messages, conversationId, openaiToken)) {
      return res.status(400).json({ error: "Invalid request parameters" });
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    try {
      await this.chatCompletionService.handleChatCompletion(messages, conversationId, openaiToken, res);
    } catch (error) {
      console.error("Unexpected error:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
}
