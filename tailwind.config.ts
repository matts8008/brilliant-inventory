import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0a0c10',
        carbon: '#12151c',
        graphite: '#1a1e28',
        steel: '#252a36',
        slate: '#3a4152',
        zinc: '#5c6477',
        silver: '#9aa3b8',
        chrome: '#c5cdd8',
        electric: '#00d4ff',
        'electric-dim': '#00a8cc',
        profit: '#00e676',
        'profit-dim': '#00c853',
        caution: '#ffab00',
        'caution-dim': '#ff8f00',
        danger: '#ff5252',
        'danger-dim': '#ff1744',
      },
      fontFamily: {
        display: ['Archivo Black', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
        body: ['Inter', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
