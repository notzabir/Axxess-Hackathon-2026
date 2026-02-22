import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  baseURL: 'https://api.featherless.ai/v1',
  apiKey: process.env.FEATHERLESS_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body.messages) ? body.messages : null;
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
    }
    // Prepend system prompt
    const systemPrompt = { role: 'system', content: 'You are a helpful assistant for general questions.' };
    const fullMessages = [systemPrompt, ...messages];
    const response = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3-0324',
      messages: fullMessages,
    });
    const answer = response.choices[0]?.message?.content?.trim() || '';
    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error('General QnA API Error:', error);
    return NextResponse.json({ error: 'Failed to answer question' }, { status: 500 });
  }
}
