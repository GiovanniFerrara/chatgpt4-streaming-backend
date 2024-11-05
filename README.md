# GPT-4o Streaming Backend

A robust Node.js backend service that handles streaming chat completions with GPT-4, conversation management, and persistent storage.

## Features

- Streaming chat completions using OpenAI's GPT-4 model
- Conversation management with persistent storage using JsonDB
- RESTful API endpoints for conversations
- Sassy and sarcastic AI personality
- Event-stream based real-time responses

## Tech Stack

- TypeScript
- OpenAI API
- JsonDB for data persistence
- Express.js (implied from the controllers structure)

## API Endpoints

### Conversations

- `POST /conversations` - Create a new conversation
- `GET /conversations` - Get all conversations
- `GET /conversations/:id` - Get a specific conversation
- `POST /conversations/chat` - Stream chat completion

### Authentication

All requests require an OpenAI API token passed via the `x-openai-token` header.


## Getting Started

1. Clone the repository
2. Install dependencies:

npm install


3. Set up your environment variables
4. Start the server:

npm start


## API Usage

### Create a New Conversation

curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-openai-token: your-openai-token" \
  -d '{"userMessage": "Hello!"}' \
  http://localhost:3000/conversations


### Stream Chat Completion

curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-openai-token: your-openai-token" \
  -d '{"messages": [{"role": "user", "content": "Hello!"}], "conversationId": "conversation-id"}' \
  http://localhost:3000/conversations/chat


## Features

- Automatic conversation title generation
- Message history persistence
- Real-time streaming responses
- Error handling and validation
- Chronological conversation sorting