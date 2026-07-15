import { NextRequest, NextResponse } from 'next/server';
import { generateExcel } from '@/lib/pdf';
import type { DocumentDefinition } from '@/lib/pdf/types';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      definition: DocumentDefinition;
      rows: Record<string, unknown>[];
    };

    if (!body.definition || !body.rows) {
      return NextResponse.json({ error: 'definition and rows are required' }, { status: 400 });
    }

    const buffer = await generateExcel(body.definition, body.rows);

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(body.definition.title)}.xlsx"`,
      },
    });
  } catch (error) {
    console.error('[Excel Export]', error);
    return NextResponse.json({ error: 'Excel generation failed', details: String(error) }, { status: 500 });
  }
}
