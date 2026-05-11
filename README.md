# music-opendata-fukui

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

Tools to download AI-generated music from a [Suno.com](https://suno.com/) playlist, archiving the music, images, and metadata as open data. This repository contains a playlist themed around "Opendata FUKUI".

## Demo

Listen to the downloaded playlist in a web-based player:
**[https://code4fukui.github.io/music-opendata-fukui/](https://code4fukui.github.io/music-opendata-fukui/)**

## About the Data

The music in this repository is generated using [Suno AI](https://suno.com/). The downloaded data for each playlist includes:
- MP3 audio files
- JPEG cover art images
- A `playlist.json` file containing metadata for all tracks, including titles, lyrics, and generation prompts.

All assets are stored locally, allowing for offline use and permanent archival.

## How to Download a Playlist

You can use the provided Deno script to scrape and download any public Suno playlist.

### Prerequisites

- [Deno](https://deno.land/) must be installed.

### Command

Run the following command in your terminal, replacing `[playlist_id]` with the ID of the Suno playlist you want to download.

```sh
deno run -A https://code4fukui.github.io/music-opendata-fukui/download.js [playlist_id]
```

**Example:**
```sh
# This is the ID for the "Opendata FUKUI" playlist
deno run -A https://code4fukui.github.io/music-opendata-fukui/download.js 0f6ef633-5f0b-436c-98e6-10fd8048b3eb
```
A playlist ID can be found in the URL of a Suno playlist (e.g., `https://suno.com/playlist/0f6ef633-5f0b-436c-98e6-10fd8048b3eb/`).

### What it Does

The script will:
1.  Fetch the playlist metadata from suno.com.
2.  Download all audio (`.mp3`) and image (`.jpeg`) files into local directories (`audio/`, `image/`, etc.).
3.  Generate a `playlist.json` file with local file paths, making the entire playlist self-contained.

You can then open `index.html` in your browser to use the local music player with the downloaded content.

## License

CC0 1.0 Universal

## Credits

- Music by [Taisuke Fukuno](https://github.com/taisukef) ([Code for Fukui](https://github.com/code4fukui/))
- Generated with [Suno](https://suno.com/)