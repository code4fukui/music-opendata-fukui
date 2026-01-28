const playlistid = Deno.args[0] ?? "0f6ef633-5f0b-436c-98e6-10fd8048b3eb";
await scrapePlaylist(playlistid);
