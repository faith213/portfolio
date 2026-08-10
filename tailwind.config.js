/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 粉嫩糖果系 palette
        cream: '#FFF3F5', // 奶油粉 主背景
        roseblack: '#2A0F26', // 深玫瑰黑 反相段
        cherry: '#3A1A2F', // 深樱桃酒红 主文本
        lilac: '#C77DFF', // 幽灵按钮 / 描边
        candy: '#FF6EC7', // 粉嫩强调
      },
      fontFamily: {
        display: ['Kanit', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '40px': '40px',
        '50px': '50px',
        '60px': '60px',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}
