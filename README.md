# DentaScale AI

A high-converting landing page for dental practice AI automation services. Built with modern web technologies to deliver a premium user experience with smooth animations and interactive elements.

## Features

- **Modern React Stack**: Built with React 19 and TypeScript for type-safe, maintainable code
- **Responsive Design**: Fully responsive design that looks great on all devices
- **Interactive UI**: Smooth animations, hover effects, and interactive components
- **AI Integration**: ElevenLabs conversational AI widget for intelligent customer interactions
- **Lead Capture**: Integrated with LeadConnector (GoHighLevel) for seamless lead management
- **Professional Styling**: TailwindCSS with custom design system and dark theme
- **Lost Revenue Calculator**: Interactive calculator to demonstrate potential value
- **Social Proof**: Testimonials and proof sections to build trust

## Tech Stack

- **Frontend Framework**: React 19.2.1
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: TailwindCSS (with PostCSS)
- **Icons**: Lucide React
- **Font**: Inter & JetBrains Mono (via Google Fonts)
- **AI Widget**: ElevenLabs Conversational AI
- **Lead Management**: GoHighLevel/LeadConnector Webhooks

## Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ItsssssJack/dental-5000.git
cd dental-5000
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then update the following environment variables in `.env`:

- **VITE_WEBHOOK_URL**: Your LeadConnector (GoHighLevel) webhook URL
  - Get this from: GoHighLevel Dashboard > Automation > Webhooks
  - Format: `https://services.leadconnectorhq.com/hooks/YOUR_HOOK_ID/webhook-trigger/YOUR_WEBHOOK_ID`

- **VITE_ELEVENLABS_AGENT_ID**: Your ElevenLabs agent ID
  - Get this from: ElevenLabs Dashboard > Agents
  - Format: `agent_YOUR_AGENT_ID_HERE`

- **GEMINI_API_KEY** (optional): Your Google Gemini API key if using server-side features
  - Get this from: Google AI Studio

Example `.env` file:
```env
VITE_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/abc123/webhook-trigger/xyz789
VITE_ELEVENLABS_AGENT_ID=agent_4301kbwvtv74enbs2f01szz2fnjr
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Build for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
dentascale-ai/
├── src/
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Application entry point
│   ├── index.css            # Global styles and Tailwind directives
│   └── vite-env.d.ts        # TypeScript environment declarations
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Project dependencies and scripts
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Key Components

The landing page includes several key sections:

1. **Hero Section**: Eye-catching headline with animated background
2. **Value Proposition**: Clear explanation of the service benefits
3. **Process Section**: Step-by-step breakdown of how it works
4. **Social Proof**: Testimonials and success stories
5. **Lost Revenue Calculator**: Interactive tool to demonstrate value
6. **Call-to-Action**: Lead capture form with webhook integration
7. **Footer**: Contact information and links

## Deployment

This app can be deployed to various platforms:

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Create a new site in Netlify
3. Connect your repository
4. Add environment variables in Netlify dashboard
5. Deploy

### Other Platforms

The production build in `dist/` can be deployed to any static hosting service:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps
- GitHub Pages

## Environment Variables

All environment variables that need to be exposed to the client must be prefixed with `VITE_` to be accessible via `import.meta.env`.

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_WEBHOOK_URL` | LeadConnector webhook URL for form submissions | Yes |
| `VITE_ELEVENLABS_AGENT_ID` | ElevenLabs AI agent identifier | Yes |
| `GEMINI_API_KEY` | Google Gemini API key (server-side only) | No |

## Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

- Never commit `.env` files to version control
- Keep your webhook URLs and API keys secure
- The `.env.example` file contains safe placeholder values only
- Ensure CORS is properly configured on your webhook endpoints

## Contributing

This is a private repository. For any issues or questions, please contact the project maintainer.

## Support

For support or questions about this project, please open an issue in the GitHub repository.
