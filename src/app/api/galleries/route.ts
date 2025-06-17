import { queryAllGalleries } from '@/services/server/queryAllGalleries';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const galleries = await queryAllGalleries();
    return NextResponse.json(galleries);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
