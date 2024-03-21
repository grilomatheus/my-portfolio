// src\vite.config.js
import { defineConfig } from "vite";
import viteEnvPlugin from '@neifify/vite-plugin-env';

export default defineConfig({
  base: "./",
  plugins: [
    viteEnvPlugin(),
  ],
});