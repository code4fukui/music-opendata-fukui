import { sleep } from "https://js.sabae.cc/sleep.js";
import { makePlaylist } from "./makePlaylist.js";

const playlistid = Deno.args[0];
if (playlistid) {
  await makePlaylist(playlistid);
}

export async function fileExists(path) {
  try {
    const stat = await Deno.stat(path);
    return stat.isFile; // ディレクトリでもOKなら true にしたいなら return true
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) return false;
    throw e; // それ以外のエラーは投げる
  }
}

const save = async (dir, url) => {
  if (!url) return "";
  const fn0 = url.substring(url.lastIndexOf("/") + 1);
  const fn = dir + "/" + fn0;
  console.log(url);
  if (await fileExists(fn)) return fn;
  await Deno.mkdir(dir, { recursive: true });
  await sleep(5 * Math.random() + 1);
  const bin = await (await fetch(url)).bytes();
  await Deno.writeFile(fn, bin);
  return fn;
};

const json = JSON.parse(await Deno.readTextFile("playlist_org.json"));
for (const item of json.playlist_clips) {
  console.log(item);
  for (const name in item.clip) {
    if (name.endsWith("_url")) {
      const dir = name.substring(0, name.length - 4);
      const url = item.clip[name];
      const fn = await save(dir, url);
      item.clip[name] = fn;
    }
  }
}
await Deno.writeTextFile("playlist.json", JSON.stringify(json, null, 2));
