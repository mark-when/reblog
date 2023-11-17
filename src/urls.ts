import {
  SomeNode,
  isEventNode,
  walk,
  Path,
  Event,
  Node,
} from "@markwhen/parser";
import { DateTime } from "luxon";

export const toArray = (node: SomeNode | undefined, cutoff: DateTime) => {
  if (!node) {
    return [];
  }
  const array = [] as { path: Path; node: Node<Event> }[];
  walk(node, [], (n, path) => {
    if (n && isEventNode(n)) {
      if (+DateTime.fromISO(n.value.dateRangeIso.fromDateTimeIso) < +cutoff) {
        array.push({ path, node: n });
      }
    }
    if (array.length === 1000) {
      return true;
    }
  });
  return array.sort(
    (a, b) =>
      +DateTime.fromISO(b.node.value.dateRangeIso.fromDateTimeIso) -
      +DateTime.fromISO(a.node.value.dateRangeIso.fromDateTimeIso)
  );
};
