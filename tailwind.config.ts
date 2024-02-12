import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
      },
      colors: {
        theme: {
          white: '#ECECEB',
          black: '#020202',
          brown: '#8A733F',
          gray: {
            50: '#A6A6A6',
            100: '#5E5D59',
          },
          green: {
            50: '#DCEAA8',
            100: '#C5EEAE',
            200: '#D5FF29',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
