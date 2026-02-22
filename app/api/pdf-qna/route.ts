import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configure the Featherless client (or OpenAI-compatible endpoint)
const client = new OpenAI({
  baseURL: 'https://api.featherless.ai/v1',
  apiKey: process.env.FEATHERLESS_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { question, context } = await req.json();
    if (!question || !context) {
      return NextResponse.json({ error: 'Missing question or context' }, { status: 400 });
    }

    // Compose prompt for Q&A over PDF context
    const prompt = `You are a helpful assistant. Given the following document context, answer the user's question as accurately as possible.\n\nDocument Context:\n${context}\n\nUser Question: ${question}\n\nAnswer:`;

    const response = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3-0324',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for answering questions about uploaded documents.' },
        { role: 'user', content: prompt },
      ],
    });

    const answer = response.choices[0]?.message?.content?.trim() || '';
    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error('PDF QnA API Error:', error);
    return NextResponse.json({ error: 'Failed to answer question' }, { status: 500 });
  }
}
