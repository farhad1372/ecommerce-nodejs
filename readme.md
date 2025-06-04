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


### Folder Structure
- src/
├── app
|   ├── controllers/      
|   ├── middlewares/
|   ├── Validators/
|   
├── config/
│   ├── supabase.ts       # DB client
│   ├── cors.ts           # CORS settings
│   └── openai.ts         # OpenAI
│   ├── auth.ts           # Auth checks
│   ├── error.ts          # Error handler
│   └── validate.ts       # Request validation
├── public/               # public files
├── services/             # Services
|   ├── openai.ts     
|   ├── database.ts
|   ├── supabase.ts
  

### Acknowledgements
-   Expressjs
-   Typescript
-   Sequelize or Mongo

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
