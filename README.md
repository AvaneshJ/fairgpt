# TruthLens

**AI-powered news verification platform** that helps combat misinformation by auditing claims and media against trusted sources, detecting bias, and revealing the truth.

## About

TruthLens uses advanced AI to verify news claims and media content. It cross-references information against the "Golden List" of trusted sources, analyzes sentiment bias, and provides balanced perspectives on any topic.

### How It Works

1. **Enter a Claim** - Type a news claim or paste a screenshot
2. **AI Verification** - The system analyzes your input against trusted sources
3. **Get Results** - See verdict, certainty score, clarifications, and source analysis
4. **Save History** - Logged-in users can save searches for later reference

## Features

### Core Features
- **News Verification** - Verify claims against trusted sources
- **Media Verification** - Analyze images and screenshots for manipulation
- **Bias Detection** - Identify sentiment bias in content
- **Source Analysis** - Evaluate source credibility
- **Alternative Perspectives** - View consensus vs alternative viewpoints

### User Features
- **User Authentication** - Sign up, login, and logout
- **Search History**
  - Logged-in users: History saved permanently to database
  - Guest users: History stored in localStorage (temporary)
- **Demo Mode** - Test the app without AI API using pre-made demo cards

### UI/UX
- **Dark/Light Mode** - Automatic theme switching
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Smooth Animations** - Landing page transitions, button effects
- **Clean Interface** - Modern, minimal design

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL with Prisma ORM |
| Auth | NextAuth.js (Credentials Provider) |
| Icons | Lucide React |
| Charts | Recharts |

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A PostgreSQL database (local or cloud)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd truthlens
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Database

Create a free PostgreSQL database on [Neon](https://neon.tech):

1. Sign up at [neon.tech](https://neon.tech) with GitHub
2. Create a new project
3. Copy the connection string

Update your `.env` file:

```env
DATABASE_URL="postgresql://your-username:your-password@your-host/database?sslmode=require"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

Generate a secret key:

```bash
openssl rand -base64 32
```

### 4. Initialize Database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
truthlens/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts   # NextAuth login/logout/session
│   │   │   └── register/route.ts        # User registration
│   │   └── history/route.ts             # History CRUD operations
│   ├── components/
│   │   ├── Providers.tsx               # Session & Theme providers
│   │   ├── BiasMeter.tsx              # Bias visualization
│   │   ├── VerificationCharts.tsx     # Source verification chart
│   │   ├── TrendChart.tsx             # Temporal trend chart
│   │   ├── ExampleQueryCards.tsx      # Example prompts
│   │   └── TestDemoCards.tsx          # Demo cards (no API needed)
│   ├── dashboard/
│   │   └── page.tsx                   # Main verification dashboard
│   ├── history/
│   │   └── page.tsx                   # User search history
│   ├── login/
│   │   └── page.tsx                   # Login page
│   ├── signup/
│   │   └── page.tsx                   # Signup page
│   ├── page.tsx                       # Landing page
│   ├── layout.tsx                     # Root layout
│   └── globals.css                    # Global styles
├── lib/
│   ├── prisma.ts                      # Prisma client singleton
│   └── auth.ts                         # NextAuth configuration
├── prisma/
│   └── schema.prisma                   # Database schema
└── .env                                # Environment variables
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features and "Analyze Now" button |
| `/dashboard` | Main verification interface with search |
| `/login` | User login page |
| `/signup` | User registration page |
| `/history` | View saved search history |

## API Endpoints

### Authentication
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handlers |
| `/api/auth/register` | POST | Create new user |

### History
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/history` | GET | Get user's search history |
| `/api/history` | POST | Save search to history |
| `/api/history` | DELETE | Delete a search |

## Deploying to Vercel

### 1. Push to GitHub
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `DATABASE_URL` - Your Neon connection string
   - `NEXTAUTH_SECRET` - Your generated secret
   - `NEXTAUTH_URL` - Your Vercel URL (e.g., `https://truthlens.vercel.app`)

### 3. Deploy
Vercel will automatically build and deploy your app.

### 4. Initialize Database
After first deployment, run:
```bash
npx prisma db push
```

## Demo Mode

The dashboard includes **Demo Cards** that let you test the app without needing AI API integration:

- **Verified Claim** - Shows a verified result
- **Misleading Claim** - Shows a misleading result
- **Fake News** - Shows a false/unverified result

Click any demo card to see how results are displayed. This is useful for testing login, history saving, and UI features.

## Environment Variables

| Variable | Description | Required |
|---------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret for NextAuth (generate with openssl) | Yes |
| `NEXTAUTH_URL` | Your app URL (localhost for dev) | Yes |

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## License

MIT
