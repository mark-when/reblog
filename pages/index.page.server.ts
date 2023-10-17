import { prerender } from "../renderer/_default.page.server";
import { getPages } from "../renderer/getPages";

export const passToClient = ["node"];

export function onBeforeRender(pageContext) {
  const prerendered = prerender();
  return {
    pageContext: {
      node: prerendered[0].pageContext.node,
    },
  };
}
