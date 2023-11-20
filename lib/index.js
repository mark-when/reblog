import { prerender } from "vike/prerender";
import '../dist/server/importBuild.cjs'

prerender({
  viteConfig: {
    configFile: require.resolve("../vite.config.ts"),
  },
});
