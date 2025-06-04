# Next.js + TypeScript + Supabase Backend API

![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-3+-3ECF8E?style=flat&logo=supabase)


### Core Stack
- **Framework**: Expressjs
- **Language**: TypeScript 5+
- **Database**: Supabase (PostgreSQL)

### Security
- **CORS**: Configurable origins
- **Helmet**: Secure HTTP headers
- **Rate Limiter**: API request throttling
- **Zod**: Input validation

### Architecture
- **Layered Structure**: Routes → Controllers → Services → Models
- **Middleware**: Authentication, error handling, validation
- **Environment Configuration**: Multi-stage support

### Acknowledgements
-   Expressjs
-   Typescript
-   Supabase

### OpenAI Configuration
  The config/openai directory contains customizable prompt templates for OpenAI interactions. You can modify these prompts to suit your specific needs.
  eg:
  summary_product_prompt: `You are provided with the full product data in JSON format, Your task is to generate a concise summary that includes:
                            - The product name.
                            - A brief summary of the description.
                            - The available attribute types (e.g., color, size) and their values.
                            - The price combinations from product_attributes, mapping attribute_ids to their corresponding values and prices.
                            Keep the summary short, clear, and structured, suitable for display on a product page.
                            you may get data in stringified json format! but you must pars it to json format.
                            just return a clean text(without html symbols or any other thing), witch means translate colors, size, and so on, and do not mention about ids!.
                            Here is the product data: `

## Run Locally

Clone the project

```bash
  git clone "rep-url"
```

Go to the project directory

```bash
  cd "project-dir"
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Author

[Farhad1372](https://github.com/farhad1372)

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)
