import { Request, Response } from "express";
import HttpCodes from "../util/codes";
import p from "phin";
import Servers from "../models/Servers";
import Themes from "../models/Theme";
import generateId from "../util/generateId";

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

        song.file = `https://openings.moe/video/${song.file}.webm`;

        res.json({
          name: song.source,
          link: song.file,
          type: `${song.title.includes("Opening") ? "OP" : "ED"}`,
          full: song,
        });
        break;
      }
      case "tsumugi": {
        // https://stackoverflow.com/questions/39277670/how-to-find-random-record-in-mongoose
        await Themes.countDocuments().exec(function (_, count) {
          // Get a random entry
          var random = Math.floor(Math.random() * count);

          // Again query all users but only fetch one offset by our random #
          Themes.findOne()
            .skip(random)
            .exec(function (_, result) {
              // yay! random theme
              return res.json(result);
            });
        });
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
  async searchAnime(req: Request, res: Response) {
    const { provider, value } = req.query;

    if (!provider)
      return res.status(HttpCodes.Bad_Request).json({
        err: "no_provider_query",
        message: "A provider was not specified.",
      });

    switch (provider) {
      case "animethemes": {
        const atResponse: any = await p({
          method: "GET",
          url: `https://animethemes.dev/api/search?q=${value}&limit=1&fields=videos`,
          parse: "json",
        });

        if (atResponse.body.anime.length > 0) {
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
        } else {
          return res.status(HttpCodes.Bad_Request).json({
            err: "no_anime",
            message: "There are no anime.",
          });
        }
        break;
      }
      case "openingsmoe": {
        const oMResponse: any = await p({
          method: "GET",
          url: "https://openings.moe/api/list.php",
          parse: "json",
        });

        const songs = oMResponse.body;
        const song: OpeningsMoeResponse = songs.filter(
          (s) => s.source === "Sword Art Online"
        )[0];

        if (!song.source)
          return res.status(HttpCodes.Bad_Request).json({
            err: "no_anime",
            message: "There are no anime.",
          });

        song.file = `https://openings.moe/video/${song.file}.webm`;

        res.json({
          name: song.source,
          link: song.file,
          type: `${song.title.includes("Opening") ? "OP" : "ED"}`,
          full: song,
        });
        break;
      }
    }
  },
  async addTheme(req: Request, res: Response) {
    const { name, type, mal, url, year, song, artist, password } = req.body;

    if (!name || !mal || !url || !year || !song || !artist || !password)
      return res.status(400).send("dude, plz set the correct values.");

    if (password !== process.env.THEME_PASS)
      return res.status(401).send("die oni-chan.");

    const theme = new Themes({
      _id: await generateId(),
      name: name,
      songName: song,
      type: type,
      artist: artist,
      year: year,
      url: url,
      mal: mal,
    }).save();
    res.json(theme);
  },
  async serverStatus(req: Request, res: Response) {
    const server = await Servers.findById("status");

    res.json({
      animethemes: server.animethemes,
      openingsmoe: server.openingsmoe,
    });
  },
};
