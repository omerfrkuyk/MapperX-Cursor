import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    
    await writeFile(sitemapPath, content);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating sitemap.xml:', error);
    return NextResponse.json(
      { error: 'Failed to update sitemap.xml' },
      { status: 500 }
    );
  }
} 