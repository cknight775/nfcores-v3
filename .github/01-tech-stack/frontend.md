# Frontend Documentation

## Tech Stack

- **React**: 18.2.0
- **Vite**: 5.0.8
- **TypeScript**: 5.3.3
- **React Router Dom**: 6.21.0
- **TailwindCSS**: 3.4.0
- **Zod**: 3.22.4
- **React Hook Form**: 7.49.2
- **Headless UI**: 1.7.17

## Configuration Examples

### Vite Configuration

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Your App Name',
        short_name: 'App',
        start_url: '/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        icons: [
          {
            src: 'icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

### PWA Setup

To configure the PWA, make sure to install the `vite-plugin-pwa`:

```bash
npm install vite-plugin-pwa --save-dev
```

### TypeScript Path Aliases

In your `tsconfig.json`, configure path aliases:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Color Palette

- **Primary**: `#DC2626`
- **Secondary**: `#10B981`
- **Accent**: `#3B82F6`

## Bundle Size Limits

- **Main**: 250KB
- **Vendor**: 500KB
- **Total**: 1MB

## Performance Targets

- **Emergency Profile**: Under 2 seconds (CRITICAL)