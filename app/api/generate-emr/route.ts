import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { marked } from 'marked';

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
    // Compose EMR generation prompt
    const systemPrompt = {
      role: 'system',
      content:
        'You are an expert medical scribe. Given the following conversation between a clinician and an AI assistant, generate a structured EMR (Electronic Medical Record) report. Include: chief complaint, history of present illness, relevant findings, assessment, and plan. Use clear, professional language and organize the report with headings.'
    };
    const fullMessages = [systemPrompt, ...messages];
    const response = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-V3-0324',
      messages: fullMessages,
    });
    let emr = response.choices[0]?.message?.content?.trim() || '';
    // Remove all '**' for bold markdown and replace unsupported Unicode characters
    emr = emr.replace(/[→]/g, '->').replace(/\*\*/g, '');
    // Remove the line 'Here is the structured EMR report with your personal details included:' if present
    emr = emr.split('\n').filter(line => !line.trim().toLowerCase().startsWith('here is the structured emr report')).join('\n');

    // Replace unsupported Unicode checkbox with ASCII alternative
    emr = emr.replace(/☐/g, '[ ]');

    // Generate PDF from EMR Markdown with basic formatting
    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage();
    let width, height;
    ({ width, height } = page.getSize());
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 12;
    const margin = 40;
    let y = height - margin;

    // Parse Markdown to tokens
    const tokens = marked.lexer(emr);
    function drawLine(text, opts = {}) {
      if (y < margin + fontSize) {
        page.drawText('...continued on next page...', { x: margin, y, size: fontSize, font, color: rgb(0.5,0,0) });
        page = pdfDoc.addPage();
        ({ width, height } = page.getSize());
        y = height - margin;
      }
      const { bold = false, size = fontSize, indent = 0 } = opts;
      page.drawText(text, {
        x: margin + indent,
        y,
        size,
        font: bold ? fontBold : font,
        color: rgb(0,0,0),
      });
      y -= size + 4;
    }

    function drawParagraph(text) {
      // Split by double newlines for paragraphs
      const paras = text.split(/\n\s*\n/);
      for (const para of paras) {
        drawLine(para.trim());
        y -= 2;
      }
    }

    function drawInline(text) {
      // Render inline bold (**) and normal text
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      let x = margin;
      for (const part of parts) {
        if (!part) continue;
        let isBold = false;
        let clean = part;
        if (part.startsWith('**') && part.endsWith('**')) {
          isBold = true;
          clean = part.slice(2, -2);
        }
        // Remove or replace newlines (WinAnsi cannot encode them)
        clean = clean.replace(/\n/g, ' ');
        if (!clean) continue;
        if (x + font.widthOfTextAtSize(clean, fontSize) > width - margin) {
          y -= fontSize + 4;
          x = margin;
        }
        page.drawText(clean, {
          x,
          y,
          size: fontSize,
          font: isBold ? fontBold : font,
          color: rgb(0,0,0),
        });
        x += font.widthOfTextAtSize(clean, fontSize) + 2;
      }
      y -= fontSize + 4;
    }

    for (const token of tokens) {
      if (token.type === 'heading') {
        drawLine(token.text, { bold: true, size: fontSize + 4 });
        y -= 6;
      } else if (token.type === 'paragraph') {
        drawInline(token.text);
        y -= 2;
      } else if (token.type === 'list') {
        for (const item of token.items) {
          drawInline('• ' + item.text);
        }
        y -= 2;
      } else if (token.type === 'strong') {
        drawLine(token.text, { bold: true });
      } else if (token.type === 'text') {
        drawInline(token.text);
      } else if (token.type === 'space') {
        y -= fontSize;
      }
    }
    const pdfBytes = await pdfDoc.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="emr-report.pdf"',
      },
    });
  } catch (error: any) {
    console.error('Generate EMR API Error:', error);
    return NextResponse.json({ error: 'Failed to generate EMR data' }, { status: 500 });
  }
}
