import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  server: {
    https: true,
    port: 8081,
  },
  plugins: [basicSsl()],
});
