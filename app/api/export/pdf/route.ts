import { NextRequest, NextResponse } from 'next/server';
import { generatePdf } from '@/lib/pdf';
import type { DocumentDefinition } from '@/lib/pdf/types';

export const runtime = 'nodejs'; // pdfkit nécessite Node.js runtime

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      definition: DocumentDefinition;
      rows: Record<string, unknown>[];
    };

    if (!body.definition || !body.rows) {
      return NextResponse.json({ error: 'definition and rows are required' }, { status: 400 });
    }

    const result = await generatePdf(body.definition, body.rows);

    return new NextResponse(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(body.definition.title)}.pdf"`,
        'X-Page-Count': String(result.pageCount),
        'X-Format': result.format,
        'X-Orientation': result.orientation,
      },
    });
  } catch (error) {
    console.error('[PDF Export]', error);
    return NextResponse.json({ error: 'PDF generation failed', details: String(error) }, { status: 500 });
  }
}
