import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// GitHub Pages 部署在 https://<用户名>.github.io/portfolio/ 子路径下，
// 因此 base 必须和仓库名一致（仓库需命名为 portfolio），否则静态资源会 404。
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
})
