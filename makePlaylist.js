import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, table2json, table2csv, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

export const makePlaylist = async (playlistid) => {
  const url = "https://suno.com/playlist/" + playlistid;

  const html = await fetchOrLoad(url);
  let idx = `self.__next_f.push([1,"5:[\\"$\\",\\"$L1b\\",null,{\\"playlist\\"`;
  let idxoff = 2;
  let n = html.indexOf(idx);
  console.log(n);
  if (n < 0) {
    idx = `self.__next_f.push([1,"12:[\\"$\\",\\"$L23\\",null,{\\"playlist\\":`
    n = html.indexOf(idx);
    idxoff = 3;
  console.log(n);
    if (n < 0) throw new Error("not found playlist on HTML");
  }
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
  console.log(m);
  const s = unescape(html.substring(n + "self.__next_f.push([1,\"".length + idxoff, m - 2));
  //console.log(s);
  //await Deno.writeTextFile("playlist.json", s);
  const json = JSON.parse(s);
  console.log(json);

  const playlist = json[3].playlist;
  await Deno.writeTextFile("playlist_org.json", JSON.stringify(playlist, null, 2));
};
