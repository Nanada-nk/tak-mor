export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'], 
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'], 
  },
}