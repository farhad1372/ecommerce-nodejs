import dotenv from 'dotenv';
dotenv.config();


const openAIConfig = {
    apiKey: process.env.OPENAI_API_KEY,
    summary_product_prompt: `You are provided with the full product data in JSON format, Your task is to generate a concise summary that includes:
                            - The product name.
                            - A brief summary of the description.
                            - The available attribute types (e.g., color, size) and their values.
                            - The price combinations from product_attributes, mapping attribute_ids to their corresponding values and prices.
                            Keep the summary short, clear, and structured, suitable for display on a product page.
                            you may get data in stringified json format! but you must pars it to json format.
                            just return a clean text(without html symbols or any other thing), witch means translate colors, size, and so on, and do not mention about ids!.
                            Here is the product data: `,
    summary_review_prompt: `You are provided with an array of user reviews for a product, where each review includes a rating (an integer from 1 to 5) and a comment (text feedback). Your task is to generate a detailed yet concise summary that includes:
                            - The average rating (rounded to one decimal place).
                            - A general overview of the sentiment (e.g., positive, neutral, negative) based on the ratings and comments.
                            - Key positive feedback highlighted from the comments.
                            - Key negative feedback or complaints, if any, with specific examples.
                            - Any recurring themes or suggestions from the reviews.
                            Keep the summary structured, detailed, and suitable for display on a product page, ensuring all significant insights are covered.
                            you may get data in stringified json format! but you must pars it to json format.
                            just return a clean text(without html symbols or any other thing).
                            Here is the product data: `
}

export default openAIConfig