import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
}

const dbFilePath = path.resolve(__dirname, 'conversations.json');

function readDatabase(): Conversation[] {
  if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(dbFilePath, 'utf-8');
  return JSON.parse(data) as Conversation[];
}

function writeDatabase(conversations: Conversation[]) {
  fs.writeFileSync(dbFilePath, JSON.stringify(conversations, null, 2));
}

export function createConversation(): Conversation {
  const conversations = readDatabase();
  const newConversation: Conversation = {
    id: uuidv4(),
    messages: [],
  };
  conversations.push(newConversation);
  writeDatabase(conversations);
  return newConversation;
}

export function getConversationById(id: string): Conversation | null {
  const conversations = readDatabase();
  const conversation = conversations.find((conv) => conv.id === id);
  return conversation || null;
}

export function getAllConversations(): Conversation[] {
  const conversations = readDatabase();
  return conversations;
}

export function saveMessageToConversation(id: string, message: Message) {
  const conversations = readDatabase();
  const conversationIndex = conversations.findIndex((conv) => conv.id === id);
  
  if (conversationIndex !== -1) {
    conversations[conversationIndex].messages.push(message);
    writeDatabase(conversations);
  } else {
    throw new Error('Conversation not found');
  }
}
