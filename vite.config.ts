import vue from "@vitejs/plugin-vue";
import vike from "vike/plugin";
import { UserConfig } from "vite";

const config: UserConfig = {
  plugins: [
    vue(),
    vike({
      prerender: true,
    }),
  ],
  server: {
    host: "0.0.0.0",
  },
};

export default config;
