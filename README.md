# GPT-4 Streaming Backend

A robust Node.js backend service that handles streaming chat completions with GPT-4, conversation management, and persistent storage.

## Features

- Streaming chat completions using OpenAI's GPT-4 model
- Conversation management with persistent storage using Firebase
- RESTful API endpoints for conversations
- Sassy and sarcastic AI personality
- Event-stream based real-time responses

## Tech Stack

- TypeScript
- OpenAI API
- Firebase Realtime Database
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


3. Set up your environment variables in .env:


# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com


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