/// <reference types="vite/client" />

// Extend CSSProperties to support custom CSS properties
declare module 'react' {
  interface CSSProperties {
    '--mouse-x'?: string;
    '--mouse-y'?: string;
  }
}

// Declare custom element for ElevenLabs widget
declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        'agent-id'?: string;
      },
      HTMLElement
    >;
  }
}

// Environment variables
interface ImportMetaEnv {
  readonly VITE_WEBHOOK_URL: string;
  readonly VITE_ELEVENLABS_AGENT_ID: string;
  readonly GEMINI_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
