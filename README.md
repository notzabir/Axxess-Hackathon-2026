# Axxess Hackathon 2026 - CareBot AI

This project is a Next.js application designed for the Axxess Hackathon 2026. It features widgets integrated across all pages, including dashboards, patient summaries, voice components, and more.

## Features

- Dashboard with patient summaries, risk distribution, robot status, and logs
- Landing page with technology highlights and features
- Voice component integration
- Summarization and Q&A APIs
- Modern UI components (accordion, alert, badge, button, etc.)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<your-org>/Axxess-Hackathon-2026-widget-in-all-pages.git
cd Axxess-Hackathon-2026-widget-in-all-pages
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your API keys:

```
# Example .env
NEXT_PUBLIC_ELEVENLABS_AGENT_ID=
FEATHERLESS_API_KEY=
```

Replace the values with your actual API keys.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

- `app/` - Main application pages and API routes
- `components/` - Reusable UI and feature components
- `hooks/` - Custom React hooks
- `lib/` - Utility functions
- `public/` - Static assets
- `styles/` - Global and component styles

## Useful Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## License

MIT

---

