import { readFileSync } from "fs";
import { parse, mapUrls } from "@markwhen/parser";
import { toArray } from "./urls";
import { DateTime } from "luxon";

export function getPages() {
  const filePath = (process && process.env && process.env.mw) || "test/test.mw";
  if (!filePath) {
    console.error("No file specified");
  }
  const parsed = getParseFromFile(filePath);
  const entries = mapUrls(
    toArray(parsed.parsed.timelines[0].events, DateTime.now())
  );
  return {
    ...parsed,
    entries,
  };
}

function getParseFromFile(inputFileName: string | number) {
  const content = readFileSync(inputFileName, "utf-8");
  const parsed = parse(content);
  return { parsed, rawText: content };
}
