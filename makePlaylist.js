import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, table2json, table2csv, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

export const makePlaylist = async (playlistid) => {
  const base = "https://suno.com/playlist/";
  const url = playlistid.startsWith(base) ? playlistid : base + playlistid;

  const html = await fetchOrLoad(url);
  const re = /self\.__next_f\.push\(\[1,"([0-9a-fA-F]+):\[\\"\$\\",\\"\$L[0-9a-fA-F]+\\",null,\{\\"playlist\\"/;
  // self.__next_f.push([1,"2c:[\"$\",\"$L3d\",null,{\"playlist\"
  const mm = html.match(re);
  if (!mm) throw new Error("not fonud playlist on HTML");
  const idx = mm[0];
  const offidx = mm[1].length;
  const n = mm.index;
  console.log(n, idx);
  // "]}}]\n"])</script><script>self.__next_f.push([1,"12:{\"met
  const indexOfEnd = (s, i) => {
    let state = 0;
    for (; i < s.length; i++) {
      const c = s[i];
      if (state == 0) {
        if (c == "\"") {
          return i;
        } else if (c == "\\") {
          state = 1;
        }
      } else if (state == 1) {
        state = 0;
      }
    }
    return -1;
  };
  const unescape = (s) => {
    return s.replace(/\\"/g, '"'); // .replace(/\\n/g, "\n");
  };

  const m = indexOfEnd(html, n + idx.length);
  const s = unescape(html.substring(n + "self.__next_f.push([1,\"".length + 1 + offidx, m - 2));
  //console.log(s);
  //await Deno.writeTextFile("playlist.json", s);
  const json = JSON.parse(s);

  const playlist = json[3].playlist;
  await Deno.writeTextFile("playlist_org.json", JSON.stringify(playlist, null, 2));
};
