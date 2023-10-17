import { prerender } from "../renderer/_default.page.server";
import { getPages } from "../renderer/getPages";

export const passToClient = ["node"];

export function onBeforeRender(pageContext) {
  const prerendered = prerender();
  const ours = prerendered.find((page) => page.url === pageContext.url);
  return {
    pageContext: {
      node: ours?.pageContext.node,
    },
  };
}
