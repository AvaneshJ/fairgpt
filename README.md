# FairGPT

AI-powered news verification platform with user authentication and search history.

## Features

- **News Verification**: Verify claims and media using AI-powered analysis
- **User Authentication**: Sign up, login, and logout functionality
- **Search History**: 
  - Logged-in users: Search history saved permanently to database
  - Guest users: Temporary history stored in localStorage
- **Dark Mode**: Automatic theme switching support
- **Responsive Design**: Works on desktop and mobile

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js (credentials provider)
- **Icons**: Lucide React
- **Charts**: Recharts

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (local or cloud)

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database - Use Vercel Postgres, Neon, or any PostgreSQL provider
DATABASE_URL="postgresql://user:password@host:5432/fairgpt?sslmode=require"

# NextAuth - Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

1. Push the Prisma schema to your database:

```bash
npx prisma db push
```

2. Generate the Prisma client:

```bash
npx prisma generate
```

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start using FairGPT.

### Build

```bash
npm run build
npm start
```

## Deploying to Vercel

### 1. Create a PostgreSQL Database

Options for free PostgreSQL:
- [Vercel Postgres](https://vercel.com/postgres)
- [Neon](https://neon.tech)
- [Supabase](https://supabase.com)

### 2. Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add the environment variables in Vercel dashboard:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL`: Your Vercel deployment URL (e.g., `https://your-app.vercel.app`)
4. Deploy!

### 3. Initialize Database

After deployment, run this in your Vercel dashboard or via CLI:

```bash
npx prisma db push
```

## Project Structure

```
app/
├── api/
│   ├── auth/
│   │   ├── [...nextauth]/route.ts  # NextAuth handler
│   │   └── register/route.ts        # User registration
│   └── history/route.ts             # Search history CRUD
├── components/
│   ├── Providers.tsx                 # Session & Theme providers
│   ├── BiasMeter.tsx
│   ├── VerificationCharts.tsx
│   ├── TrendChart.tsx
│   └── ExampleQueryCards.tsx
├── history/
│   └── page.tsx                      # Search history page
├── login/
│   └── page.tsx                      # Login page
├── signup/
│   └── page.tsx                      # Signup page
├── page.tsx                          # Main dashboard
└── layout.tsx                        # Root layout

lib/
├── prisma.ts                         # Prisma client singleton
└── auth.ts                           # NextAuth configuration

prisma/
└── schema.prisma                      # Database schema
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/[...nextauth]` - NextAuth handlers (login/logout/session)

### History
- `GET /api/history` - Get user's search history
- `POST /api/history` - Save search to history
- `DELETE /api/history` - Delete a search from history

## License

MIT
