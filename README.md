# Medical Chat App

[![Deploy with Vercel](https://vercel.com/button)](https://medical-chat-app-delta.vercel.app/) [![Deployment Status](https://therealsujitk-vercel-badge.vercel.app/?app=medical-chat-app-delta)](https://medical-chat-app-delta.vercel.app/)

A real-time consultation application that enables doctor-patient communication and generates medical records using AI.

🔗 **[Live Demo](https://medical-chat-app-delta.vercel.app/)**

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for responsive design
- **Language**: TypeScript for type-safe code
- **LLM API:** [OpenAI](https://openai.com/) (specifically, the `gpt-4o` model)
  

## LLM Integration

This app uses OpenAI's GPT models for medical record generation.

### API Details:
- **Model**: GPT-4
- **Endpoint**: `/api/generate`
- **Features**:
  - Conversation analysis
  - Medical record formatting
  - Symptom summarization

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

 ## Note
 
 This project is a technical assessment/test for a full stack engineer role and is not intended for production use or distribution.
