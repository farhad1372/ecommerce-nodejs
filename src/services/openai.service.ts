
import OpenAI from 'openai';

export class OpenAIService {
    private openai: OpenAI;

    constructor() {

        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async summarizeText(text: string): Promise<{ fails: boolean, message: string }> {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: `Summarize this text: ${text}` }],
                max_tokens: 150,
            });
            if (!response?.choices?.[0]?.message?.content) return { fails: true, message: 'Failed to summarize text' };
            return {
                fails: false,
                message: response.choices[0].message.content.trim()
            }
        } catch (e) {
            return {
                fails: true,
                message: `${e}`
            }
        }
    }

    async analyzeReviews(reviews: { comment: string; rating: number }[]): Promise<{ fails: boolean, message: string }> {
        try {
            const reviewText = reviews.map(r => `Rating: ${r.rating}, Comment: ${r.comment}`).join('\n');
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{
                    role: 'user',
                    content: `Analyze and summarize these reviews:\n${reviewText}\nProvide a concise summary and overall sentiment (positive, neutral, negative).`
                }],
                max_tokens: 200,
            });
            if (!response?.choices?.[0]?.message?.content) return { fails: true, message: 'Failed to summarize text' };
            return {
                fails: true,
                message: response.choices[0].message.content.trim()
            }
        } catch (e) {
            return {
                fails: true,
                message: `${e}`
            }
        }
    }
}



