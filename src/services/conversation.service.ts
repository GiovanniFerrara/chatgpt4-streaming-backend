import { generateConversationTitle } from "../title-generator.service";
import {
  createConversation,
  getConversationById,
  getAllConversations,
  saveMessageToConversation,
} from "../conversations-storage";

export class ConversationService {
  async createNewConversation(openaiToken: string, userMessage: string) {
    const conversationTitle = await generateConversationTitle(openaiToken, userMessage);
    return await createConversation(userMessage, conversationTitle);
  }

  async getConversationById(id: string) {
    return await getConversationById(id);
  }

  async getAllConversations() {
    const conversations = await getAllConversations();
    return conversations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async saveMessage(conversationId: string, message: any) {
    return await saveMessageToConversation(conversationId, message);
  }
}
