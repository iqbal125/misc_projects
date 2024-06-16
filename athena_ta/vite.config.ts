import {defineConfig, configDefaults} from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"
import {URL, fileURLToPath} from "node:url"

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "node",
    exclude: [...configDefaults.exclude, "playwright/*"],
  },
  resolve: {
    alias: [{find: "@", replacement: fileURLToPath(new URL("./", import.meta.url))}],
  },
})
