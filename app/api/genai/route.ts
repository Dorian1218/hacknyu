import { createGoogleGenerativeAI, google } from '@ai-sdk/google';
import {GoogleGenerativeAI} from "@google/generative-ai"
import { streamText } from 'ai';

export async function POST(req: Request) {
    const {messages} = await req.json()
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_SECRET!)
    const model = genAI.getGenerativeModel({model : "gemini-1.5-pro"})
    const streamingResponse = await model.generateContentStream()
}