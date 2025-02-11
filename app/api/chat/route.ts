"use server"

import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
    try {
        const { messages, transactions } = await req.json();
        const streamingResponse = streamText({
            model: google('gemini-1.5-pro-latest'),
            messages,
            system: "You are a financial assistant who's job is to provide assistance to the signed in user given their recent transactions and help with general finance tips" + 
            "They will ask you a question, and so long as it is related to their finances or a general question about financial literacy, you will answer" + 
            "if it is not related to finance tell the user to ask a finance-related question" + `use this data ${JSON.stringify(transactions)}`
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
