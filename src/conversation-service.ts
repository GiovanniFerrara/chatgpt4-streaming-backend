import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}


const db = new JsonDB(new Config("conversations", true, false, '/'));


export async function createConversation(conversationTitle: string): Promise<Conversation> {
  const newConversation: Conversation = {
    createdAt: new Date(),
    title: conversationTitle,
    id: uuidv4(),
    messages: [],
  };
  
  await db.push(`/conversations/${newConversation.id}`, newConversation);
  return newConversation;
}

export async function getConversationById(id: string): Promise<Conversation | null> {
  try {
    const conversation = await db.getData(`/conversations/${id}`) as Conversation;
    return conversation;
  } catch (error) {
    
    return null;
  }
}

export async function getAllConversations(): Promise<Conversation[]> {
  try {
    const conversations = await db.getData(`/conversations`) as { [key: string]: Conversation };
    return Object.values(conversations);
  } catch (error) {
    
    return [];
  }
}

export async function saveMessageToConversation(id: string, message: Message): Promise<void> {
  try {
    
    await db.push(`/conversations/${id}/messages[]`, message, true);
  } catch (error) {
    throw new Error('Conversation not found');
  }
}
