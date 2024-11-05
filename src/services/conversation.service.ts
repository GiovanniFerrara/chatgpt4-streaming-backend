import { ConversationsStorageService } from "./conversations-storage.service";
import { generateConversationTitle } from "./utils/title-generator";

export class ConversationService {
  private conversationsStorageService: ConversationsStorageService;
  constructor(
  ) {
    this.conversationsStorageService = new ConversationsStorageService()
  }
  async createNewConversation(openaiToken: string, userMessage: string) {
    const conversationTitle = await generateConversationTitle(openaiToken, userMessage);
    return await this.conversationsStorageService.createConversation(userMessage, conversationTitle);
  }

  async getConversationById(id: string) {
    return await this.conversationsStorageService.getConversationById(id);
  }

  async getAllConversations() {
    const conversations = await this.conversationsStorageService.getAllConversations();
    return conversations.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async saveMessage(conversationId: string, message: any) {
    return await this.conversationsStorageService.saveMessageToConversation(conversationId, message);
  }
}
