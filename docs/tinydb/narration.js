// Tour narration (English).
// Each class is introduced with the first paragraph of its own docstring (from data.js);
// the numbers (lines, gates, links) are composed at runtime from the analysis data.
// This file only holds the visiting order and text for things the source does not say.
window.NARRATION = {
  outro: "That is the whole of tinydb. Click any planet to fly back to it.",
  // 動画ではクリックできないので、締めの一文を差し替える
  outroVideo: "That is the whole of tinydb: fourteen classes, held together by lines of light.",
  // Visiting order: from the entrance, to tables, queries, and storages.
  order: ["TinyDB", "Table", "Document", "LRUCache", "Query", "QueryInstance", "QueryLike",
          "Storage", "JSONStorage", "MemoryStorage", "Middleware", "CachingMiddleware", "FrozenDict", "TinyDBPlugin"],
  // Used only when a class has no docstring.
  fallback: {
    TinyDBPlugin: "A plugin for the mypy type checker. This class has no docstring.",
  },
};
