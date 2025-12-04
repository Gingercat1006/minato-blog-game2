// vite.config.js (★★★★★ アプリ化・最終完成版 ★★★★★)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/minato-blog-game2/", 
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // アプリを自動更新する設定
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // キャッシュするファイル
      manifest: {
        name: '湊の個人ブログ', // アプリの正式名称
        short_name: '湊のブログ', // ホーム画面の下に出る短い名前
        description: 'Web探索型謎解きゲーム',
        theme_color: '#ffffff', // テーマカラー
        background_color: '#ffffff',
        display: 'standalone', // ★重要★ これでブラウザの枠が消えて、全画面アプリになります
        icons: [
          {
            src: 'images/favicon.png', // あなたが用意したアイコン
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/favicon.png', // 大きいサイズも同じ画像を指定しておきます
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})