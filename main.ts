// Post the Meme, Win the Feed — entry by duckey11
// Reads POST.json next to this file and prints a summary of the X post
// that carries this entry's meme. No external dependencies, node builtins only.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MENTION = "@_myronera";
const PLAY_CODE = "makefun-stone-pennant-chalet";
const BOUNTY_SLUG = "u-myronera-post-the-meme-win-the-feed-2de960bf";
const ENTRY_TITLE = "Post the Meme, Win the Feed";

const dir = dirname(fileURLToPath(import.meta.url));
const postPath = join(dir, "POST.json");
let raw;
try {
  raw = readFileSync(postPath, "utf8");
} catch {
  console.error("POST.json not found next to main.ts; expected at " + postPath);
  process.exit(1);
}
const post = JSON.parse(raw);

const match = String(post.url).match(
  /^https:\/\/(x\.com|twitter\.com)\/([^/]+)\/status\/(\d+)$/,
);
if (!match) {
  console.error(
    "POST.json url must look like https://x.com/<handle>/status/<id> " +
      "(host x.com or twitter.com only); got: " +
      String(post.url),
  );
  process.exit(1);
}
const [, host, handle, statusId] = match;

console.log(
  JSON.stringify(
    {
      post_url: post.url,
      host,
      handle,
      status_id: statusId,
      mention: MENTION,
      play_code: PLAY_CODE,
      bounty_slug: BOUNTY_SLUG,
      entry_title: ENTRY_TITLE,
    },
    null,
    2,
  ),
);
