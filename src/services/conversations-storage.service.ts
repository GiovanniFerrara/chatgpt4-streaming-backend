import { ChildProcess } from "child_process";
import { JsonDB, Config } from "node-json-db";
import { v4 as uuidv4 } from "uuid";

export interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: Message[];
}

export class ConversationsStorageService {
  private db: JsonDB;

  constructor() {
    this.db = new JsonDB(new Config("conversations", true, false, "/"));
  }

  async createConversation(
    userMessage: string,
    conversationTitle: string
  ): Promise<Conversation> {
    const newConversation: Conversation = {
      createdAt: new Date(),
      title: conversationTitle || "New conversation",
      id: uuidv4(),
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    };

    await this.db.push(`/conversations/${newConversation.id}`, newConversation);
    return newConversation;
  }

  async updateConversationTitle(id: string, newTitle: string): Promise<void> {
    try {
      await this.db.push(`/conversations/${id}/title`, newTitle, true);
    } catch (error) {
      console.error("Error updating conversation title:", error);
      throw error;
    }
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    try {
      return this.db.getData(
        `/conversations/${id}`
      )
    } catch (error) {
      return null;
    }
  }

  async getAllConversations(): Promise<Conversation[]> {
    try {
      const conversations = (await this.db.getData(`/conversations`)) as {
        [key: string]: Conversation;
      };
      return Object.values(conversations);
    } catch (error) {
      return [];
    }
  }

  async saveMessageToConversation(id: string, message: Message): Promise<void> {
    console.log("Saving message to conversation:", id, message);
    try {
      await this.db.push(`/conversations/${id}/messages[]`, message, true);
    } catch (error) {
      throw new Error("Conversation not found");
    }
  }
}
