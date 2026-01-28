import { fetchOrLoad, HTMLParser, CSV, nextTag, prevTag, table2json, table2csv, sleep } from "https://code4fukui.github.io/scrapeutil/scrapeutil.js";

const playlistid = Deno.args[0] ?? "0f6ef633-5f0b-436c-98e6-10fd8048b3eb";
const url = "https://suno.com/playlist/" + playlistid;

const html = await fetchOrLoad(url);
const idx = `self.__next_f.push([1,"5:[\\"$\\",\\"$L1b\\",null,{\\"playlist\\"`;
const n = html.indexOf(idx);
console.log(n);
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
const s = unescape(html.substring(n + "self.__next_f.push([1,\"".length + 2, m - 2));
//console.log(s);
//await Deno.writeTextFile("playlist.json", s);
const json = JSON.parse(s);
console.log(json);

const playlist = json[3].playlist;
await Deno.writeTextFile("playlist_org.json", JSON.stringify(playlist, null, 2));
