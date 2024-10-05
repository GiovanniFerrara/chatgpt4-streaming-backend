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

const app = express();

app.use(cors());

app.use(express.json());

dotenv.config();

const port = process.env.PORT || 5120;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
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
app.post('/api/conversations', async (req: Request, res: Response) => {
  try {
    const newConversation = await createConversation(); // Await the Promise
    res.status(201).json({ id: newConversation.id });
  } catch (error) {
    console.error('Error creating conversation:', error);
    res.status(500).json({ error: 'Failed to create conversation' });
  }
});

// Retrieve a conversation by ID
app.get('/api/conversations/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const conversation = await getConversationById(id); // Await the Promise
    if (conversation) {
      res.json(conversation);
    } else {
      res.status(404).json({ error: 'Conversation not found' });
    }
  } catch (error) {
    console.error('Error retrieving conversation:', error);
    res.status(500).json({ error: 'Failed to retrieve conversation' });
  }
});

// Retrieve all conversations
app.get('/api/conversations', async (req: Request, res: Response) => {
  try {
    const conversations = await getAllConversations(); // Await the Promise
    res.json(conversations);
  } catch (error) {
    console.error('Error retrieving conversations:', error);
    res.status(500).json({ error: 'Failed to retrieve conversations' });
  }
});

// Chat completion endpoint
app.post('/api/chat-completion-stream', async (req: Request, res: Response) => {
  console.log("Received a request for chat completion");

  const { messages, conversationId } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  if (!conversationId) {
    return res.status(400).json({ error: 'Conversation ID is required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    for (const message of messages) {
      if (message.role === 'user') {
        await saveMessageToConversation(conversationId, message);
      }
    }

    const conversation = await getConversationById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const openaiMessages = [
      systemMessage,
      ...conversation.messages.map(m => ({
        role: m.role,
        content: m.content,
      })),
    ];

    console.log('OpenAI messages:', openaiMessages);

    let completion;
    try {
      console.log('Initiating OpenAI API call');
      completion = await openai.chat.completions.create({
        model: 'gpt-4', // Ensure the model name is correct
        messages: openaiMessages as ChatCompletionMessageParam[],
        stream: true,
      });
      console.log('OpenAI API call successful');
    } catch (error) {
      console.error('Error during OpenAI API call:', error);
      res.status(500).json({ error: 'An error occurred while calling OpenAI API' });
      return;
    }

    let assistantMessageContent = '';
    try {
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          assistantMessageContent += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }
      console.log('Streaming response completed');
    } catch (error) {
      console.error('Error during streaming:', error);
      res.status(500).json({ error: 'An error occurred during streaming' });
      return;
    }

    const assistantMessage: Message = {
      role: 'assistant',
      content: assistantMessageContent,
    };

    await saveMessageToConversation(conversationId, assistantMessage);

    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('Unexpected error:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
