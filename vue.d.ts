import { Timelines } from "@markwhen/parser";
import type { SomeNode } from "@markwhen/parser";

declare module "*.vue" {
  const Component: any;
  export default Component;
}

declare global {
  namespace Vike {
    interface PageContext {
      // Define type of pageContext.user
      allPages: PageInfo[];
      mw: Timelines;
      ours?: PageInfo;
    }
  }
}

export type PageInfo = {
  url: string;
  node: SomeNode;
  path: number[];
};

// type PageProps = {
//   movies: {
//     title: string
//     releaseDate: Date
//   }[]
// }

// Tell TypeScript this file isn't an ambient module
export {};
