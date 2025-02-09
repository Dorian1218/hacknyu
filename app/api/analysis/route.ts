"use server"

import { google } from '@ai-sdk/google';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message, streamText } from 'ai';

export async function POST(req: Request) {
    try {
        const { transactions } = await req.json();
        const streamingResponse = streamText({
            model: google('gemini-1.5-pro-latest'),
            messages: [
                {
                    role: "system",
                    content: `You are a financial assistant that helps users analyze their financial transactions and gives personalized tips.`
                },
                {
                    role: "user",
                    content: `Here is a summary of my financial transactions for the past month: ${JSON.stringify(transactions)}. Please provide tips for improving my spending habits and managing my finances better.`
                }
            ],
            system: "Your job is to analyze the financial summary provided by the user and provide helpful, actionable tips for improving their financial habits."
        });
        console.log(streamingResponse.toDataStreamResponse())
        return streamingResponse.toDataStreamResponse()
    } catch (error) {
        console.error('Error processing request:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
