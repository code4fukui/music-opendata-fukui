import { parsePlaylistFromHtml } from "./makePlaylist.js";

const assertEquals = (actual, expected) => {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
    );
  }
};

Deno.test("parses a playlist from any Next.js payload id", () => {
  const playlist = {
    entity_type: "playlist_schema",
    id: "playlist-id",
    name: 'quotes " and braces { work',
    playlist_clips: [],
  };
  const chunk = `41:["$","$L59",null,{"playlist":${JSON.stringify(playlist)}}]`;
  const html = `<script>self.__next_f.push(${
    JSON.stringify([1, chunk])
  })</script>`;
  assertEquals(parsePlaylistFromHtml(html), playlist);
});
