import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#fff9e6' },
          100: { value: '#ffecb3' },
          200: { value: '#ffdf80' },
          300: { value: '#ffd24d' },
          400: { value: '#ffc526' },
          500: { value: '#f5b800' },
          600: { value: '#d4a000' },
          700: { value: '#b38600' },
          800: { value: '#926d00' },
          900: { value: '#715400' },
        },
        surface: {
          bg: { value: '#0d1117' },
          card: { value: '#161b22' },
          cardHover: { value: '#1c2333' },
          border: { value: '#30363d' },
          overlay: { value: 'rgba(13, 17, 23, 0.85)' },
        },
        text: {
          primary: { value: '#e6edf3' },
          secondary: { value: '#8b949e' },
          muted: { value: '#6e7681' },
        },
      },
      fonts: {
        heading: { value: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
        body: { value: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
