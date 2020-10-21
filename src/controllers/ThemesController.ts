import { Request, Response } from "express";
import p from "phin";

interface OpeningsMoeResponse {
  title: string;
  source: string;
  file: string;
  mime: Array<string>;
  song: {
    title: string;
    artist: string;
  };
}

export default {
  async getRandomTheme(req: Request, res: Response) {
    const { provider } = req.query;

    switch (provider) {
      case "animethemes": {
        const randomPage: Number = Math.floor(Math.random() * (131 - 1)) + 1;
        const atResponse: any = await p({
          method: "GET",
          url: `https://animethemes.dev/api/video?page[size]=200&page[number]=${randomPage}`,
          parse: "json",
        });

        const videos = atResponse.body.videos;
        const video = videos[Math.floor(Math.random() * videos.length)];

        const animeLink: String = video.link.replace(
          "animethemes.dev",
          "animethemes.moe"
        );

        res.json({
          name: video.entries[0].theme.anime.name,
          link: animeLink,
          type: video.entries[0].theme.type,
          full: video,
        });
        break;
      }
      case "openingsmoe": {
        const oMResponse: any = await p({
          method: "GET",
          url: "https://openings.moe/api/list.php",
          parse: "json",
        });

        const songs = oMResponse.body;
        const song: OpeningsMoeResponse =
          songs[Math.floor(Math.random() * songs.length)];

        song.file = `https://openings.moe/video/${song.file}.mp4`;

        res.json(song);
        break;
      }
    }
  },
};
