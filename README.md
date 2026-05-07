# AI Customer Support Command Center — Frontend

Responsive Next.js + TypeScript + Tailwind frontend for the NestJS backend API.

## Features Implemented

- Login/register against `/auth/login` and `/auth/register`
- Zustand auth/session store with localStorage persistence
- Protected dashboard layout
- Analytics dashboard consuming `/analytics/dashboard`
- Customers CRM consuming `/customers`
- Conversations inbox consuming `/conversations`
- Message sending through `/conversations/:id/messages`
- AI suggested reply through `/conversations/:id/ai-reply`
- Human takeover through `/conversations/:id/takeover`
- Ticket board consuming `/tickets`
- Ticket status/priority updates through `/tickets/:id`
- Knowledge base articles and search through `/knowledge-base/articles` and `/knowledge-base/search`
- Socket.IO client ready for realtime conversation/ticket events
- Responsive layout for mobile, tablet, and desktop

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Expected backend URL:

```txt
http://localhost:4000/api/v1
```

Demo backend seed login:

```txt
admin@demo.com
Password123!
```

## Folder Structure

```txt
src/
├── app/                       # Next.js app router pages
│   ├── login/                 # Auth page
│   └── dashboard/             # Protected product area
├── components/                # Reusable UI/layout components
├── lib/                       # API client, helpers, socket client
├── store/                     # Zustand stores
└── types/                     # Shared API/domain types
```

## Important Notes

This frontend is designed to match the backend generated earlier. Keep `NEXT_PUBLIC_API_BASE_URL` pointed to the API server. The UI contains graceful fallback states, but real data comes from the backend seed and APIs.
