
import OpenAI from 'openai';
import openAIConfig from '@config/openai.js';

export class OpenAIService {
    private openai: OpenAI;

    constructor() {

        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async summarizeText(product_data: { [key: string]: any }): Promise<{ fails: boolean, message: string }> {
        try {
            console.log("product_data", product_data)
            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{
                    role: 'user',
                    content: `${openAIConfig.summary_product_prompt} ${JSON.stringify(product_data)}`
                }],
                max_tokens: 150,
            });
            if (!response?.choices?.[0]?.message?.content) return { fails: true, message: 'Failed to summarize info' };
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

    async analyzeReviews(reviews: { content: string; rate: number, full_name: string, created_at: string }[]): Promise<{ fails: boolean, message: string }> {
        try {

            const response = await this.openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{
                    role: 'user',
                    content: `${openAIConfig.summary_review_prompt} ${JSON.stringify(reviews)}`
                }],
                max_tokens: 200,
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
}



