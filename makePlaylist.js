import { fetchOrLoad } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

const findJsonObjectEnd = (text, start) => {
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const c = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') inString = true;
    else if (c === "{") depth++;
    else if (c === "}" && --depth === 0) return i + 1;
  }
  return -1;
};

const findPlaylist = (text) => {
  const marker = '"playlist":';
  let pos = 0;
  while ((pos = text.indexOf(marker, pos)) !== -1) {
    const start = text.indexOf("{", pos + marker.length);
    if (start === -1) break;
    const end = findJsonObjectEnd(text, start);
    if (end === -1) break;
    try {
      const playlist = JSON.parse(text.slice(start, end));
      if (playlist?.entity_type === "playlist_schema") return playlist;
    } catch {
      // This occurrence was not the playlist payload; keep looking.
    }
    pos += marker.length;
  }
  return null;
};

export const parsePlaylistFromHtml = (html) => {
  // Decode every React Server Components chunk. The component and payload IDs
  // are generated values and changed from hexadecimal to decimal on Suno.
  const re = /self\.__next_f\.push\((\[[\s\S]*?\])\)<\/script>/g;
  for (const match of html.matchAll(re)) {
    try {
      const value = JSON.parse(match[1]);
      if (typeof value[1] !== "string") continue;
      const playlist = findPlaylist(value[1]);
      if (playlist) return playlist;
    } catch {
      // Ignore unrelated or incomplete script tags.
    }
  }
  const playlist = findPlaylist(html);
  if (playlist) return playlist;
  throw new Error("playlist not found in Suno page");
};

export const makePlaylist = async (playlistid) => {
  const base = "https://suno.com/playlist/";
  const url = playlistid.startsWith(base) ? playlistid : base + playlistid;

  const html = await fetchOrLoad(url);
  const playlist = parsePlaylistFromHtml(html);
  await Deno.writeTextFile(
    "playlist_org.json",
    JSON.stringify(playlist, null, 2),
  );
};
