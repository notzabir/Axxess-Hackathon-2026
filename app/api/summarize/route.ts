import { NextRequest, NextResponse } from 'next/server';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import OpenAI from 'openai';
import { PDFParse } from 'pdf-parse';

const pdfWorkerPath = path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'legacy', 'build', 'pdf.worker.mjs');
PDFParse.setWorker(pathToFileURL(pdfWorkerPath).toString());

// Configure the Featherless client [cite: 191, 193, 194]
const client = new OpenAI({
  baseURL: 'https://api.featherless.ai/v1',
  apiKey: process.env.FEATHERLESS_API_KEY, 
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. Extract text from the PDF buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    const parser = new PDFParse({ data: buffer });
    const pdfData = await parser.getText();
    await parser.destroy();
    const clinicalText = pdfData.text;

    // 2. Inference via Featherless [cite: 195, 196]
    // Suggested Model: DeepSeek-V3 for advanced reasoning [cite: 165]
    const response = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3-0324', 
      messages: [
        {
          role: 'system',
          content: `You are a Diagnostic Assistant. Summarize the following clinical data:
          - Extract vitals and symptoms.
          - Map to suggested ICD-10 codes.
          - Suggest treatments and recommend medications based on those ICD-10 codes.
          - Provide a patient-friendly summary.
          Use clean Markdown formatting.`
        },
        { role: 'user', content: clinicalText },
      ],
      // Feather Premium supports up to 32K context, 
      // which is plenty for medical docs[cite: 20].
    });

    return NextResponse.json({ result: response.choices[0].message.content });

  } catch (error: any) {
    // Handle common errors like 401 (Unauthenticated) or 503 (Capacity) [cite: 220, 226]
    console.error('Featherless API Error:', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}