import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
      components: "/src/components",
      pages: "/src/pages",
      utils: "/src/utils",
      hooks: "/src/hooks",
      assets: "/src/assets",
      data: "/src/data",
      styles: "/src/styles",
      context: "/src/context",
      leyout: "/src/leyout",
      providers: "/src/providers",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        credentials: "include",
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
