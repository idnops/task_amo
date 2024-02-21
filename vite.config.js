import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/oauth": {
          target: env.VITE_OAUTH_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/oauth/, ""),
        },
      },
    },
  };
});
