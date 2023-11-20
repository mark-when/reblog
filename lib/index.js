import { prerender } from "vike/prerender";

prerender({
  viteConfig: {
    configFile: require.resolve("../vite.config.ts"),
  },
});
