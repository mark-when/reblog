import { getPages } from "../renderer/getPages";

export const passToClient = ["node"];

export function onBeforeRender(pageContext) {
  const pages = getPages();
  return {
    pageContext: {
      node: pages.entries[0].node,
    },
  };
}
