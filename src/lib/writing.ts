import { getCollection, type CollectionEntry } from "astro:content";

export type WritingEntry = CollectionEntry<"writing">;

export async function getVisibleWriting(): Promise<WritingEntry[]> {
  const includeDrafts = import.meta.env.DEV || import.meta.env.MODE === "preview";
  const entries = await getCollection(
    "writing",
    ({ data }) => includeDrafts || !data.draft,
  );

  return entries.sort((left, right) => {
    return (
      writingActivityDate(right).valueOf() -
      writingActivityDate(left).valueOf()
    );
  });
}

export function writingActivityDate(entry: WritingEntry): Date {
  return entry.data.updated ?? entry.data.date;
}

export function writingHref(entry: WritingEntry): string {
  return `/writing/${entry.id}/`;
}

export function formatWritingDate(date: Date): string {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Shanghai",
  }).format(date);
}
