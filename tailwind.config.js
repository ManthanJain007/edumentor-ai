/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gemini-blue': '#4285f4',
        'ai-purple': '#8a2be2',
        'neural-teal': '#00cccc',
        'quantum-green': '#00ff95',
        'hologram-orange': '#ff6d00',
        'cyber-dark': '#0f0f23',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      }
    },
  },
  plugins: [],
}