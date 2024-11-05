import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConversationService } from "./services/conversation.service";
import { ChatCompletionService } from "./services/chat-completion.service";
import { ConversationController } from "./controllers/conversations.controller";

dotenv.config();
const app = express();
const port = process.env.PORT || 5120;

app.use(cors());
app.use(express.json());

const conversationService = new ConversationService();
const chatCompletionService = new ChatCompletionService();
const conversationController = new ConversationController(conversationService, chatCompletionService);

app.post("/api/conversations", (req, res) => conversationController.createConversation(req, res));
app.get("/api/conversations/:id", (req, res) => conversationController.getConversation(req, res));
app.get("/api/conversations", (req, res) => conversationController.getAllConversations(req, res));
app.post("/api/chat-completion-stream", (req, res) => conversationController.streamChatCompletion(req, res));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
