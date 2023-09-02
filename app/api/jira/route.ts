import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(request: NextRequest) {
    if (request.headers.get('app_api_key') !== process.env.APP_API_KEY) {
        return NextResponse.json({
            error: 'Not authorized'
        });
    }

  const data = await request.json();

  console.log(data);

  if (!data) {
    return NextResponse.json({
        error: 'No data provided'
    });
  }

  return NextResponse.json({ data: 'Hello world' }, { status: 200 });
}