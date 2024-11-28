/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {  
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        mygreen: {
          100: '#D6EFD8',
          300:'#80AF81',
          500: '#508D4E',
          700: '#1A5319',
          750: '#185519',
        },
        mylightgreen: {
          100: '#F3FF90',
          300: '#9BEC00',
          500: '#06D001',
          700: '#059212'
        },
        fadedGrayBg: '#F5F7F8',
        myyellow: '#FCDE70',
      },
      backgroundImage: {
        'green-landscape-hd': "url('./green-landscape-hd.jpg')",
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }
      })
    }
  ],
}

