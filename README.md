# AI Resume Builder

Modern SaaS-style resume builder with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, JWT)
- Resume form with personal info, experience, education, skills
- AI-generated professional summary
- AI skill suggestions
- Live resume preview
- PDF download
- Responsive dark UI

## Prerequisites

- Node.js 20+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- Optional: OpenAI API key for real AI (fallback templates work without it)

## Setup

```powershell
cd C:\Users\hi\Desktop\AI-Resume-Builder
npm run install:all
```

Edit `server/.env`:

- `MONGODB_URI` — your MongoDB connection string
- `JWT_SECRET` — long random string for production
- `OPENAI_API_KEY` — optional, for GPT-powered summary/skills

## Run

```powershell
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5000

## Scripts

| Command | Description |
|---------|-------------|
| `npm run install:all` | Install root, server, and client dependencies |
| `npm run dev` | Run API + client together |
| `npm run dev:server` | API only |
| `npm run dev:client` | Client only |

## Project structure

```
AI-Resume-Builder/
├── client/     React + Vite + Tailwind
├── server/     Express + MongoDB + OpenAI + Puppeteer PDF
└── package.json
```
