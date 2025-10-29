import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const  { conversation } = await req.json();
    if (!conversation) {
      return NextResponse.json({ error: 'Conversation history must be provided' }, { status: 400 });
    }

    const systemPrompt = `
      You are a helpful medical assistant, analyze a conversation between a doctor and a patient and generate a concise medical record. Format the output only as follows:
      Chief Complaint: The patient's main reason for the visit
      Symptoms: List of all symptoms mentioned, including duration and severity
      Assessment: A brief, likely assessment based on the symptoms
      Plan: The doctor's recommended plan or prescription
    `;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      temperature: 0.3, // More deterministic output
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: conversation }
      ],
    });

    const medicalRecord = response.choices[0].message.content;
    return NextResponse.json({ medicalRecord });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed to generate medical record' }, { status: 500 });
  }
}