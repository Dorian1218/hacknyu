"use server"

import { google } from '@ai-sdk/google';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, streamText } from 'ai';

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        const streamingResponse = streamText({
            model: google('gemini-1.5-pro-latest'),
            messages,
        });
        return streamingResponse.toDataStreamResponse()
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
