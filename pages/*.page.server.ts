import { PageContextServer } from "vike/types";
import { prerender } from "../renderer/_default.page.server";

export const passToClient = ["mw", "allPages", "ours"];

export function onBeforeRender(pageContext: PageContextServer) {
  const prerendered = prerender();
  const ours = prerendered.find(
    ({ url }) =>
      pageContext.urlPathname === url || pageContext.urlPathname === `/${url}`
  );
  return {
    pageContext: ours?.pageContext,
  };
}
