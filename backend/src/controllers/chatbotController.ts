import { Request, Response } from 'express';
import { HfInference } from '@huggingface/inference';

const inference = new HfInference(process.env.HF_TOKEN);

export async function chat(req: Request, res: Response) {
    const { message } = req.body;

    try {
        const responseChunks: string[] = [];
        for await (const chunk of inference.chatCompletionStream({
            model: 'microsoft/DialoGPT-small',
            messages: [{ role: 'user', content: message }],
            max_tokens: 3000,
        })) {
            responseChunks.push(chunk.choices[0]?.delta?.content || "");
        }
        
        res.json({ reply: responseChunks.join('') });
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).json({ error: 'Error processing the request' });
    }
}
