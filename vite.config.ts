import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          mui: ["@mui/material", "@mui/icons-material"],
          table: ["@tanstack/react-table"],
          "date-utils": ["dayjs", "moment"],
          routing: ["react-router"],
          carousel: ["react-slick", "slick-carousel"],
        },
      },
    },
  },
});
