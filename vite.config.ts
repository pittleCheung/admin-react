import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
// vite.config.ts
import viteEslint from "vite-plugin-eslint"
// stylelint
import viteStylelint from "@amatlash/vite-plugin-stylelint"

// import svgr from 'vite-plugin-svgr'

import path from "path"

console.log(process.env.TYPE, "=======")

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log("command, mode====", env)

  return {
    plugins: [
      react(),
      viteEslint({
        emitError: false,
        emitWarning: true,
        failOnWarning: true,
        failOnError: true
      }),
      viteStylelint({
        // 对某些文件排除检查
        exclude: /windicss|node_modules/
      })
      // svgr()
    ],
    resolve: {
      // 别名配置
      alias: {
        "@assets": path.join(__dirname, "src/assets"),
        src: path.join(__dirname, "src")
      }
    },
    optimizeDeps: {
      force: true
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // 更改主题在这里
            "primary-color": "#52c41a",
            "link-color": "#1DA57A",
            "border-radius-base": "2px"
          },
          javascriptEnabled: true
        }
      }
    },
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 3001, // 类型： number 指定服务器端口;
      // open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      // cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      proxy: {
        "/api": "http://127.0.0.1:7001",
        "/res": "http://127.0.0.1:7001"
      }
    }
    // json: {
    //   stringify: true
    // }
  }
})
