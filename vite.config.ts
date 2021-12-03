import reactRefresh from '@vitejs/plugin-react-refresh';
import fs from 'fs';
import lessToJS from 'less-vars-to-js';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';
import reactJsx from 'vite-react-jsx';

import apiConfig from './config/apiConfig';

const themeVariables = lessToJS(fs.readFileSync(path.resolve(__dirname, './config/variables.less'), 'utf8'));

function _resolve(dir: string) {
  return path.resolve(__dirname, dir);
}

// 环境变量
const env = process.argv[process.argv.length - 1];
const base = apiConfig[env];

export default defineConfig({
  base: base.cdn, // 开发或生产环境服务的公共基础路径
  plugins: [
    reactRefresh(),
    reactJsx(),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `antd/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  // css配置
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
      scss: {
        // 自动导入全局样式
        additionalData: "@import '@/common/styles/base.scss';",
      },
      modules: {
        scopeBehaviour: 'local',
      },
    },
  },

  // 别名设置
  resolve: {
    alias: {
      '@': _resolve('./src'),
      public: _resolve('./public'),
    },
  },

  // 代理
  server: {
    port: 8000,
    // proxy: {
    //   "/api": {
    //     target: "http://100.100.69.106:8090",
    //     changeOrigin: true,
    //     rewrite: (url) => url.replace(/^\/api/, "")
    //   }
    // }
  },
  build: {
    sourcemap: true,
  },
});
