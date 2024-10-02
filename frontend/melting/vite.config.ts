import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './mkcert/key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, './mkcert/cert.pem')),
    },
    host: 'localhost',
    port: 5173, // 원하는 포트 번호 설정 가능
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
