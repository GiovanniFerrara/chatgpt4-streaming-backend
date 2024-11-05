import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import OpenAI from "openai";
import {
  createConversation,
  getConversationById,
  getAllConversations,
  saveMessageToConversation,
  Message,
} from "./conversations-storage";
import { generateConversationTitle } from "./title-generator.service";
import { createChatCompletion } from "./openai.service";
import { Stream } from "openai/streaming";

const app = express();

app.use(cors());

app.use(express.json());

dotenv.config();

const port = process.env.PORT || 5120;

app.post("/api/conversations", async (req: Request, res: Response) => {
  if (!req.body.userMessage) {
    return res
      .status(400)
      .json({ error: "Missing userMessage in request body" });
  }
  const openaiToken = req.headers["x-openai-token"] as string;

  if (!openaiToken) {
    return res.status(401).json({ error: "OpenAI token is required" });
  }

  try {
    const { userMessage } = req.body;
    const conversationTitle = await generateConversationTitle(
      openaiToken,
      userMessage
    );
    const newConversation = await createConversation(
      userMessage,
      conversationTitle
    );

    res.status(201).json({ id: newConversation.id });
  } catch (error) {
    console.error("Error creating conversation:", error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
});

app.get("/api/conversations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await getConversationById(id);
    if (conversation) {
      res.json(conversation);
    } else {
      res.status(404).json({ error: "Conversation not found" });
    }
  } catch (error) {
    console.error("Error retrieving conversation:", error);
    res.status(500).json({ error: "Failed to retrieve conversation" });
  }
});

app.get("/api/conversations", async (req: Request, res: Response) => {
  try {
    const conversations = await getAllConversations();
    res.json(
      conversations.sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      )
    );
  } catch (error) {
    console.error("Error retrieving conversations:", error);
    res.status(500).json({ error: "Failed to retrieve conversations" });
  }
});

app.post("/api/chat-completion-stream", async (req: Request, res: Response) => {
  const { messages, conversationId } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  if (!conversationId) {
    return res.status(400).json({ error: "Conversation ID is required" });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const openaiToken = req.headers["x-openai-token"] as string;

  if (!openaiToken) {
    return res.status(401).json({ error: "OpenAI token is required" });
  }


  try {
    const chatContainsOneMessage = messages.length === 1;
    const message = messages[messages.length - 1];

    if (message.role === "user" && !chatContainsOneMessage) {
      await saveMessageToConversation(conversationId, message);
    }

    const conversation = await getConversationById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    const openaiMessages = conversation.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    let completion;
    
    try {
      completion = await createChatCompletion({
        apiKey: openaiToken,
        messages: openaiMessages,
        stream: true,
      });
    } catch (error) {
      console.error("Error during OpenAI API call:", error);
      res
        .status(500)
        .json({ error: "An error occurred while calling OpenAI API" });
      return;
    }

    let assistantMessageContent = "";
      [];

    try {
      for await (const chunk of completion as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>) {
        const delta = chunk.choices[0]?.delta;

        if (chunk.choices[0]?.delta?.content) {
          const content = chunk.choices[0].delta.content;
          assistantMessageContent += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      console.log("Streaming simple response completed");
    } catch (error) {
      console.error("Error during streaming:", error);
      res.status(500).json({ error: "An error occurred during streaming" });
      return;
    }

    const assistantMessage: Message = {
      role: "assistant",
      content: assistantMessageContent,
    };

    await saveMessageToConversation(conversationId, assistantMessage);

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
