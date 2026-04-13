import type { Preview, Decorator } from '@storybook/nextjs-vite'
import { useEffect } from 'react'

// Import the real app CSS — brings in Tailwind v4 + all CSS custom property tokens
import '../src/app/globals.css'

// ── Theme decorator ────────────────────────────────────────────────────────────
// Applies data-theme to <html> so all CSS token layers (--bg, --surface, etc.)
// resolve correctly, exactly as the app does in layout.tsx.

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? 'dark'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <Story />
}

// ── Preview config ─────────────────────────────────────────────────────────────

const preview: Preview = {
  // Toolbar toggle — switches between dark and light theme
  globalTypes: {
    theme: {
      description: 'Tema visual do ORAKLO',
      defaultValue: 'dark',
      toolbar: {
        title: 'Tema',
        icon: 'circlehollow',
        items: [
          { value: 'dark',  title: 'Dark'  },
          { value: 'light', title: 'Light' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [withTheme],

  parameters: {
    // Wrap stories in a div that picks up the app background so tokens are visible
    backgrounds: { disable: true },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },

    layout: 'padded',
  },
}

export default preview
