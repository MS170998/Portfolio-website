module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#011825",
        secondary: "#F0EFEB",
        tertiary: "#0D3056",
        quaternary: "#1689C8",
      },
      screens: {
        'xs': "450px",
        '3xl': "2160px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/herobg.jpeg')",
      },
      keyframes: {
        textRotate1: {
          '0%, 40%': { transform: 'translate3d(0, 0%, 0) rotateX(0deg)' },
          '60%, 100%': { transform: 'translate3d(0, -100%, 0) rotateX(-90deg)' },
        },
        textRotate2: {
          '0%, 40%': { transform: 'translate3d(0, 100%, 0) rotateX(-90deg)' },
          '60%, 100%': { transform: 'translate3d(0, 0%, 0) rotateX(0deg)' },
        },
        typewriter: {
          '0%': { width: '0%' },
          '20%': { width: '0%' },
          '40%': { width: '100%' },
          '60%': { width: '100%' },
          '80%': { width: '0%' },
          '100%': { width: '0%' }
        },
        blink: {
          '0%': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' },
          '100%': { borderColor: 'transparent' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        }
      },
      animation: {
        textRotate1: 'textRotate1 2.4s infinite alternate',
        textRotate2: 'textRotate2 2.4s infinite alternate',
        typewriter: 'typewriter 8s ease-out infinite',
        blink: 'blink 0.8s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        fadeIn: 'fadeIn 2s ease-in-out forwards'
      },
      fontSize: {
        title: '2rem',
        subtitle: '1.5rem',
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.5)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.7)',
        'lg': '0 3px 6px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.8)',
        'glow': '0 0 5px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-md': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.7), 0 0 2px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          textShadow: '0 3px 6px rgba(0, 0, 0, 0.9), 0 0 5px rgba(0, 0, 0, 0.8)',
        },
        '.text-shadow-glow': {
          textShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.transform-style-3d': {
          transformStyle: 'preserve-3d',
        },
        '.origin-bottom': {
          transformOrigin: 'bottom',
        },
      }
      addUtilities(newUtilities)
    }
  ],
};
