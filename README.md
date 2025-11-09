# SentinelForge

AI-powered vulnerability and malicious-code detection platform for open-source projects.

## Overview

SentinelForge automatically finds vulnerabilities and malicious code in open source projects using multiple AI agents working in concert:

- **Data Agent**: Parses and structures uploaded files
- **Intent Agent**: Analyzes context and intent of security threats
- **Analysis Agent**: Runs heuristic checks for common vulnerabilities
- **Report Agent**: Generates comprehensive security reports
- **Main Agent**: Combines all analyses into actionable insights

## Features

- Upload logs, code, or configuration files
- Real-time AI analysis with live status updates
- Intent-aware threat detection
- Automated vulnerability scanning
- Export reports in JSON, CSV formats
- Responsive design with resizable agent panels
- Command palette (Cmd+K) for quick actions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required environment variables:
- `NEXT_PUBLIC_DATA_AGENT_URL` - Data agent API endpoint
- `NEXT_PUBLIC_INTENT_AGENT_URL` - Intent agent API endpoint

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```


## Project Structure

```
app/
├── page.tsx              # Landing page
├── dashboard/            # Main dashboard with 5 agent panels
└── auth/
    ├── login/           # Login page
    └── signup/          # Signup page

components/
├── agent-window.tsx      # Agent panel component
├── command-palette.tsx   # Cmd+K command palette
└── ui/                  # shadcn/ui components

lib/
├── types.ts             # TypeScript types
├── api-client.ts        # API client with polling
├── auth.ts              # Authentication utilities
├── redaction.ts         # Sensitive data redaction
├── analysis-heuristics.ts  # Vulnerability detection
└── export.ts            # Report export utilities

```

## Agent Endpoints

### Data Agent API

- `GET /health` - Health check
- `POST /api/upload` - Upload file for analysis
- `GET /api/logs/:id` - Get scan status
- `POST /api/logs/:id/summarize` - Generate summary
- `DELETE /api/logs/:id` - Delete scan

### Intent Agent API

- `POST /analyze-intent` - Analyze intent from prompt

## Security Features

- Automatic redaction of sensitive data (API keys, tokens, passwords)
- Row Level Security with Supabase
- Client-side data validation
- Rate limiting on polling requests
- Secure credential storage

## Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open command palette
- `U` - Upload file (in command palette)
- `E` - Export report (in command palette)

## Technologies

- Next.js 13 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Axios
- React Resizable Panels
- Sonner (Toast notifications)
- Supabase (Database)

## License

MIT
