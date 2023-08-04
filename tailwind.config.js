/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'tablet': {'max': '991px'},
        'mobile': {'max': '780px'},
        'mobileView': {'max': '767px'},
        'xs': {'max': '640px'},
        'xxs': {'max': '575px'},
        'xss':{'max':'475px'},
        'xxxs': {'max': '425px'},
        'smalldevice': {'max': '375px'},
      },
      colors: {
        transparent: 'transparent',
        formBg: '#7795f8',
        bodyBg:'#000000',
        labelColor:'#c4f0ff',
        buttonBg:'#6772e5',
        whiteText:'#fff',
        payBtn:'#f6a4eb',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
