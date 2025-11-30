# Orbitfolio - Portfolio Tracker

A comprehensive portfolio tracking application for stocks (India, US, Canada), mutual funds, and cryptocurrencies.

## Features
- Track stocks from India, US, and Canada
- Monitor mutual funds
- Track cryptocurrency holdings
- Real-time price updates
- Portfolio performance analytics
- Alerts and notifications

## Tech Stack
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Supabase (Database)
- Vercel (Deployment)

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/orbitfolio/orbitfolioapp.git
cd orbitfolioapp
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

4. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

The app is configured for automatic deployment on Vercel when you push to the main branch.

## License
MIT