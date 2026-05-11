# music-opendata-fukui

[Suno.com](https://suno.com/) のプレイリストからAI生成音楽をダウンロードし、音楽、画像、メタデータをオープンデータとしてアーカイブするためのツールです。このリポジトリには「Opendata FUKUI」をテーマにしたプレイリストが含まれています。

## デモ

ダウンロードしたプレイリストをWebベースのプレイヤーで試聴できます:
**[https://code4fukui.github.io/music-opendata-fukui/](https://code4fukui.github.io/music-opendata-fukui/)**

## データについて

このリポジトリの音楽は [Suno AI](https://suno.com/) を使用して生成されています。ダウンロードされる各プレイリストのデータには以下が含まれます:
- MP3オーディオファイル
- JPEGカバーアート画像
- すべてのトラックのメタデータ（タイトル、歌詞、生成プロンプトなど）を含む `playlist.json` ファイル

すべてのアセットはローカルに保存されるため、オフラインでの利用や永続的なアーカイブが可能です。

## プレイリストのダウンロード方法

付属のDenoスクリプトを使用して、Sunoの公開プレイリストをスクレイピングし、ダウンロードすることができます。

### 前提条件

- [Deno](https://deno.land/) がインストールされていること。

### コマンド

ターミナルで以下のコマンドを実行します。`[playlist_id]` の部分は、ダウンロードしたいSunoプレイリストのIDに置き換えてください。

```sh
deno run -A https://code4fukui.github.io/music-opendata-fukui/download.js [playlist_id]
```

**例:**
```sh
# これは「Opendata FUKUI」プレイリストのIDの例です
deno run -A https://code4fukui.github.io/music-opendata-fukui/download.js 0f6ef633-5f0b-436c-98e6-10fd8048b3eb
```
プレイリストIDは、SunoのプレイリストのURLから確認できます（例: `https://suno.com/playlist/0f6ef633-5f0b-436c-98e6-10fd8048b3eb/`）。

### 動作内容

このスクリプトは以下の処理を行います:
1. suno.comからプレイリストのメタデータを取得します。
2. すべてのオーディオ（`.mp3`）と画像（`.jpeg`）ファイルをローカルディレクトリ（`audio/`、`image/` など）にダウンロードします。
3. ローカルのファイルパスを記述した `playlist.json` を生成し、プレイリスト全体を自己完結型（オフラインで動作可能）にします。

その後、ブラウザで `index.html` を開くと、ダウンロードしたコンテンツをローカルの音楽プレイヤーで再生できます。

## ライセンス

CC0 1.0 Universal

## クレジット

- 音楽制作: [Taisuke Fukuno](https://github.com/taisukef) ([Code for Fukui](https://github.com/code4fukui/))
- 生成ツール: [Suno](https://suno.com/)
