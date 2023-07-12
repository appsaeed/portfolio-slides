import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  base: "./",
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "chunk.js",
        manualChunks: undefined,
      },
    },
  },
});
