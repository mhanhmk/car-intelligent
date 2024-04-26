import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { Plugin as cdnImport } from 'vite-plugin-cdn-import-async'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    cdnImport({
      modules: [
        {
          name: '@remix-run/router',
          var: 'RemixRouter',
          path: `https://unpkg.com/@remix-run/router@1.6.3/dist/router.umd.min.js`,
        },
        {
          name: 'react',
          var: 'React',
          path: `https://unpkg.com/react@18.2.0/umd/react.production.min.js`,
        },
        {
          name: 'react-router',
          var: 'ReactRouter',
          path: `https://unpkg.com/react-router@6.11.2/dist/umd/react-router.production.min.js`,
        },
        {
          name: 'react-dom',
          var: 'ReactDOM',
          path: `https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js`,
        },
        {
          name: 'react-router-dom',
          var: 'ReactRouterDOM',
          path: `https://unpkg.com/react-router-dom@6.11.2/dist/umd/react-router-dom.production.min.js`,
        },
        {
          name: 'bizcharts',
          var: 'BizCharts',
          path: `https://g.alicdn.com/code/lib/bizcharts/4.1.22/BizCharts.js`,
        },
        {
          name: 'axios', // Module without 'mode' param will be loaded synchronously.
          var: 'axios',
          path: 'https://unpkg.com/axios@1.4.0/dist/axios.min.js',
        },
      ],
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  server: {
    port: 3000,
    proxy: {
      '/fas': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/fas/, ''),
      },
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  // server: {
  //   port: 3000,
  //   proxy: {
  //     '/fas': {
  //       target: 'http://116.62.133.17:80',
  //       changeOrigin: true,
  //     },
  //     '/api': {
  //       target: 'http://116.62.133.17:80',
  //       changeOrigin: true,
  //     },
  //   },
  // },
})
