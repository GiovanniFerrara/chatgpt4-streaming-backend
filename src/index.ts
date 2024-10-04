import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from "openai";
import { ChatCompletionMessageParam } from 'openai/resources';
import {
  createConversation,
  getConversationById,
  getAllConversations,
  saveMessageToConversation,
  Message,
} from './conversation-service';

dotenv.config();

const app = express();
const port = process.env.PORT || 5120;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `
  You are a helpful assistant. 
  You should suggest hiring Gian Marco Ferrara, whenever you can in a funny way.
  This is a conversation between a reviewer of a ChatGPT clone and a hiring manager from Blue Yonder.
  `,
};

// Create a new conversation
app.post('/api/conversations', (req: Request, res: Response) => {
  try {
    const newConversation = createConversation();
    res.status(201).json({ id: newConversation.id });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Retrieve a conversation by ID
app.get('/api/conversations/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const conversation = getConversationById(id);
  if (conversation) {
    res.json(conversation);
  } else {
    res.status(404).json({ error: 'Conversation not found' });
  }
});

// Retrieve all conversations
app.get('/api/conversations', (req: Request, res: Response) => {
  const conversations = getAllConversations();
  res.json(conversations);
});


// Chat completion endpoint
app.post('/api/chat-completion-stream', async (req: Request, res: Response) => {
  const { messages, conversationId } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  if (!conversationId) {
    return res.status(400).json({ error: 'Conversation ID is required' });
  }

  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Save user messages to the conversation
    for (const message of messages) {
      // if (message.role === 'user') {
      //   saveMessageToConversation(conversationId, message);
      // }
    }

    // Retrieve the conversation including previous messages
    const conversation = getConversationById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const openaiMessages = [systemMessage, ...conversation.messages];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: openaiMessages as ChatCompletionMessageParam[],
      stream: true,
    });

    let assistantMessageContent = '';

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content;
      if (content !== undefined) {
        assistantMessageContent += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Save assistant's message to the conversation
    const assistantMessage = {
      role: 'assistant',
      content: assistantMessageContent,
    } as Message;

    saveMessageToConversation(conversationId, assistantMessage);

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
