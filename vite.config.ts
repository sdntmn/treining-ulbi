import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr({ include: "**/*.svg" })],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify("http://localhost:8080"),
    __PROJECT__: JSON.stringify("frontend"),
  },
  css: {
    modules: {
      localsConvention: "dashes", // или 'dashes' для сохранения дефисов
      generateScopedName: "[local]", // опционально
    },
  },
})
