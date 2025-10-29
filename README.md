# Medical Chat App

A real-time consultation application that enables doctor-patient communication and generates medical records using AI.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive design
- **Language**: TypeScript for type-safe code
- **Features**:
  - Real-time chat interface
  - Dark mode support
  - Responsive design
  - Medical record generation

## How to Run the App

1. **Prerequisites**:
   - Node.js 18+ installed
   - npm or yarn package manager

2. **Environment Setup**:
   ```bash
   # Clone the repository
   git clone https://github.com/Selsinee/medical-chat-app.git
   cd medical-chat-app

   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the App**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## LLM Integration

This app uses OpenAI's GPT models for medical record generation.

### API Details:
- **Model**: GPT-4
- **Endpoint**: `/api/generate`
- **Features**:
  - Conversation analysis
  - Medical record formatting
  - Symptom summarization

 ## Note
 
 This project is a technical assessment/test for a full stack engineer role and is not intended for production use or distribution.
