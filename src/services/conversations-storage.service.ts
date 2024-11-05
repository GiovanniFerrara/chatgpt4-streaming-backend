import { getDatabase, ref, set, get, push, child,serverTimestamp } from "firebase/database";
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
  private db;

  constructor() {
    this.db = getDatabase();
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

    await set(ref(this.db, `conversations/${newConversation.id}`), {
      ...newConversation,
      createdAt: serverTimestamp(),
    });
    return newConversation;
  }


  async getAllConversations(): Promise<Conversation[]> {
    try {
      const snapshot = await get(child(ref(this.db), 'conversations'));
      if (!snapshot.exists()) return [];

      return Object.values(snapshot.val()).map((conv: any) => ({
        id: conv.id,
        title: conv.title,
        createdAt: new Date(conv.createdAt),
        messages: Object.values(conv.messages)
      }));
    } catch (error) {
      return [];
    }
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    try {
      const snapshot = await get(child(ref(this.db), `conversations/${id}`));
      if (!snapshot.exists()) return null;
      
      const conv = snapshot.val();
      return {
        id: conv.id,
        title: conv.title,
        createdAt: new Date(conv.createdAt),
        messages: Object.values(conv.messages)
      };
    } catch (error) {
      return null;
    }
  }

  async saveMessageToConversation(id: string, message: Message): Promise<void> {
    console.log("Saving message to conversation:", id, message);
    try {
      const conversationRef = ref(this.db, `conversations/${id}/messages`);
      const newMessageRef = push(conversationRef);
      await set(newMessageRef, message);
    } catch (error) {
      throw new Error("Conversation not found");
    }
  }
}
