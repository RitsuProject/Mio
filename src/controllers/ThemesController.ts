import { Request, Response } from "express";
import HttpCodes from "../util/codes";
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

    if (!provider)
      return res.status(HttpCodes.Bad_Request).json({
        err: "no_provider_query",
        message: "A provider was not specified.",
      });

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

  async getRandomThemeFromYear(req: Request, res: Response) {
    const { year } = req.query;

    if (!year)
      return res.status(HttpCodes.Bad_Request).json({
        err: "no_year_query",
        message: "A year was not specified.",
      });

    const atResponse: any = await p({
      method: "GET",
      url: `https://animethemes.dev/api/anime?filter[year]=${year}`,
      parse: "json",
    });

    const animes = atResponse.body.anime;
    const anime = animes[Math.floor(Math.random() * animes.length)];
    if (anime === undefined)
      return res.status(HttpCodes.Bad_Request).json({
        err: "no_anime",
        message: "There are no anime that year.",
      });

    const animeLink = anime.themes[0].entries[0].videos[0].link.replace(
      "animethemes.dev",
      "animethemes.moe"
    );

    res.json({
      warning:
        "The filter per year only works using AnimeThemes as a provider.",
      name: anime.name,
      link: animeLink,
      type: anime.themes[0].type,
      full: anime,
    });
  },
};
