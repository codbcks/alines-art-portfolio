import { NextRequest, NextResponse } from 'next/server';
import { insertGallery, queryAllGalleries } from '@/services/server/galleryServerService';
import { Gallery } from '@/types/Gallery';

export async function GET() {
  try {
    const galleries = await queryAllGalleries();
    return NextResponse.json(galleries);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const galleryData: Gallery = await request.json();
    const newGallery = await insertGallery(galleryData);
    return NextResponse.json(newGallery, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
