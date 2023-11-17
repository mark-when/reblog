import { PageContextServer } from "vike/types";
import { prerender } from "../renderer/_default.page.server";

export const passToClient = ["mw", "allPages", "ours"];

export function onBeforeRender(pageContext: PageContextServer) {
  const prerendered = prerender();
  const ours = prerendered.pages.find((page) => page.url === pageContext.url);
  return {
    pageContext: {
      ours,
      allPages: prerendered.pages,
      mw: prerendered.mw,
    },
  };
}
