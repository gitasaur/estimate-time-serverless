import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jsonrepair } from 'jsonrepair';

import { logger } from '../../logger';
import { systemPrompt } from './prompt';
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(request: NextRequest) {
    logger.info(request.headers);
    
    if (request.headers.get('app_api_key') !== process.env.APP_API_KEY) {
        return NextResponse.json({
            error: 'Not authorized'
        });
    }

    const task = await request.json();
    logger.info(task);

    if (!task) {
      return NextResponse.json({
          error: 'No task provided'
      });
    }
 
  // Ask OpenAI for a streaming completion given the prompt\
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
        {
            role: 'system',
            content: systemPrompt
        },
        {
            role: 'user',
            content: JSON.stringify(task)
        }
    ]
  });

  if (!completion?.choices[0]?.message?.content) {
    return NextResponse.json({
        error: 'GPT did not respond with a valid estimation.'
      });
  }

  logger.info(completion?.choices[0]?.message?.content);

  try {
    const response = JSON.parse(jsonrepair(completion.choices[0].message.content));
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      error: 'Issue with JSON format from GPT'
    }, { status: 500 });
  }
}