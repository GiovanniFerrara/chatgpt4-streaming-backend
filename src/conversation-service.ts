import { JsonDB, Config } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  messages: Message[];
}

// Initialize the database
const db = new JsonDB(new Config("conversations", true, false, '/'));

// Async functions to handle the database operations
export async function createConversation(): Promise<Conversation> {
  console.log("createConversation");
  const newConversation: Conversation = {
    id: uuidv4(),
    messages: [],
  };
  // Push the new conversation into the database
  await db.push(`/conversations/${newConversation.id}`, newConversation);
  return newConversation;
}

export async function getConversationById(id: string): Promise<Conversation | null> {
  console.log("getConversationById");
  try {
    const conversation = await db.getData(`/conversations/${id}`) as Conversation;
    return conversation;
  } catch (error) {
    // If conversation not found, return null
    return null;
  }
}

export async function getAllConversations(): Promise<Conversation[]> {
  console.log("getAllConversations");
  try {
    const conversations = await db.getData(`/conversations`) as { [key: string]: Conversation };
    return Object.values(conversations);
  } catch (error) {
    // If no conversations exist yet, return an empty array
    return [];
  }
}

export async function saveMessageToConversation(id: string, message: Message): Promise<void> {
  console.log('saveMessageToConversation');
  try {
    // Append the message to the messages array of the conversation
    await db.push(`/conversations/${id}/messages[]`, message, true);
  } catch (error) {
    throw new Error('Conversation not found');
  }
}
