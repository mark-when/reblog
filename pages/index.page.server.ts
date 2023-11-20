import { PageContextServer } from "vike/types";
import { prerender } from "../renderer/_default.page.server";

export const passToClient = ["allPages", "mw"];

export function onBeforeRender(pageContext: PageContextServer) {
  const prerendered = prerender();
  return {
    pageContext: {
      allPages: prerendered.pages,
      mw: prerendered.mw,
    },
  };
}
