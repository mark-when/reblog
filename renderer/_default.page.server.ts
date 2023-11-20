export { render };
// See https://vike.dev/data-fetching
export const passToClient = ["pageProps", "urlPathname", "node", "header"];

import { renderToString as renderToString_ } from "@vue/server-renderer";
import type { App } from "vue";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { createApp } from "./app";
import logoUrl from "./logo.svg";
import type { PageContextServer } from "../src/types";
import { getPages } from "../src/getPages";
import { Event, Node, SomeNode } from "@markwhen/parser";
import { innerHtml } from "../src/utilities/html";

interface Prerendered {
  url: string;
  pageContext: Vike.PageContext;
}

export function prerender(): Prerendered[] {
  const pages = getPages();
  const urls: Prerendered[] = pages.entries.map(({ url, node, path }) => ({
    url: `/${url}`,
    pageContext: {
      mw: pages.parsed,
      allPages: pages.entries,
      ours: {
        url,
        node: node as SomeNode,
        path,
      },
    },
  }));
  urls.unshift({
    url: "/",
    pageContext: {
      mw: pages.parsed,
      allPages: pages.entries,
    },
  });
  return urls;
}

async function render(pageContext: PageContextServer) {
  const { Page } = pageContext;
  // This render() hook only supports SSR, see https://vike.dev/render-modes for how to modify render() to support SPA
  if (!Page)
    throw new Error("My render() hook expects pageContext.Page to be defined");
  const app = createApp(Page, {}, pageContext);

  const appHtml = await renderToString(app);
  const { mw, ours } = pageContext;
  if (!mw) {
    return {
      documentHtml: `<p>Page not found!</p>`,
    };
  }
  let title, desc;
  const header = mw.timelines[0].header;
  if (ours) {
    const eventDescription = (ours.node as Node<Event>).value.eventDescription;
    if (eventDescription.eventDescription) {
      title = eventDescription.eventDescription;
    } else if (
      eventDescription.supplemental &&
      eventDescription.supplemental.length
    ) {
      const candidateTitle = eventDescription.supplemental
        .filter((s) => s.type !== "image")
        .find((s) => !!s.raw);
      if (candidateTitle) {
        if (!title) {
          title = innerHtml(candidateTitle.raw);
        } else {
          desc = innerHtml(candidateTitle.raw);
        }
      }
    }

    if (title && (header.re?.title || header.title)) {
      title += ` | ${header.re?.title || header.title}`;
    }
  }
  title ||= header.re?.title || header.title;
  desc ||= header.re?.description || header.description;

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <link rel="icon" type="image/png" href="/favicon.png">
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="app">${dangerouslySkipEscape(appHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vike.dev/page-redirection
    },
  };
}

async function renderToString(app: App) {
  let err: unknown;
  // Workaround: renderToString_() swallows errors in production, see https://github.com/vuejs/core/issues/7876
  app.config.errorHandler = (err_) => {
    err = err_;
  };
  const appHtml = await renderToString_(app);
  if (err) throw err;
  return appHtml;
}
