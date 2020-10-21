import { Request, Response } from "express";
import p from "phin";

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

        return res.json({
          name: video.entries[0].theme.anime.name,
          link: animeLink,
          type: video.entries[0].theme.type,
          full: video,
        });
      }
    }
  },
};
