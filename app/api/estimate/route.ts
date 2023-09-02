import OpenAI from 'openai';
import { NextResponse, NextMiddleware } from 'next/server';
import type { NextRequest } from 'next/server';
import { jsonrepair } from 'jsonrepair';

import { logger } from '../../logger';
import { systemPrompt } from './prompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Task = {
  summary: string;
  discription: string;
  subtasks?: Task[]
}

type EstimateRequest = {
  summary: string;
  discription: string;
  parent: Task[];
}

export async function POST(request: NextRequest) {
  logger.info(request.headers);

  if (request.headers.get('app_api_key') !== process.env.APP_API_KEY) {
    return NextResponse.json({
      error: 'Not authorized'
    });
  }

  const task = await getTask(request);

  if (!task) {
    return NextResponse.json({
      error: 'No task provided'
    });
  }
  
  const completion = await getCompletion(task);
  logger.info(completion);

  return NextResponse.json(completion, { status: 200 });
}

const getTask = async (request: NextRequest) => {
  try {
    const text = await request.text();
    const task = JSON.parse(jsonrepair(text));
    logger.info(task);
    return task;
  } catch (error) {
    logger.error(error);
  }
  throw Error('Input was badly formatted: check request data');
}

const getCompletion = async (task: EstimateRequest) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: JSON.stringify(task, null, 2)
        }
      ]
    });

    if (!completion?.choices[0]?.message?.content) {
      return NextResponse.json({
        error: 'GPT did not respond with a valid result.'
      });
    }

    const response = JSON.parse(jsonrepair(completion.choices[0].message.content));
    logger.info(response);
    return response;
  } catch (error) {
    logger.error(error);
  }
  throw Error('Error getting response from GPT');
}