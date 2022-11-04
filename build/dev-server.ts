import { createServer, UserConfig } from "vite";
import detectPort from "detect-port";
import checker from "vite-plugin-checker";
import viteReact from "@vitejs/plugin-react";
import path from "path";

const devConfig: UserConfig = {
  base: "/",
  mode: "development",
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".cjs"],
    alias: {
      "@src": path.resolve(__dirname, "../src"),
    },
  },
  css: {
    modules: {
      scopeBehaviour: "local",
      generateScopedName: "[name]-[local]-[hash:base64:5]",
    },
    preprocessorOptions: {
      sass: {
        charset: false,
        javascriptEnabled: true,
      },
      scss: {
        charset: false,
        javascriptEnabled: true,
      },
      css: {
        charset: false,
      },
    },
  },
  plugins: [
    viteReact({
      jsxRuntime: "classic",
    }),
    checker({
      typescript: true,
      overlay: true,
    }),
  ],
  server: {
    hmr: true,
    open: true,
    host: true,
  },
};

let port = 3000;
async function startDevServer() {
  const _port = await detectPort(port);
  if (_port === port && devConfig.server) {
    devConfig.server.port = _port;
    const server = await createServer(devConfig);
    await server.listen();
    server.printUrls();
    return;
  }
  port += 1;
  await startDevServer();
}

startDevServer();
