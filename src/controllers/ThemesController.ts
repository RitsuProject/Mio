import { Request, Response } from "express";
import HttpCodes from "../util/codes";
import p from "phin";
import yaml from "yaml";
import axios from "axios";
require("express-async-errors");

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
  /**
    Get a random theme from a specified provider.
   */
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
          url: `https://staging.animethemes.moe/api/video?page[size]=200&page[number]=${randomPage}`,
          parse: "json",
        }).catch((e) => {
          return res.status(HttpCodes.InternalError).send(e);
        });

        const videos = atResponse.body.videos;
        const video = videos[Math.floor(Math.random() * videos.length)];

        const animeLink: String = video.link.replace(
          "v.staging.animethemes.moe",
          "animethemes.moe/video"
        );

        const songDetails: any = await p({
          method: "GET",
          url: `https://staging.animethemes.moe/api/song/${video.entries[0].theme.id}`,
          parse: "json",
        });

        res.json({
          name: video.entries[0].theme.anime.name,
          link: animeLink,
          type: video.entries[0].theme.type,
          songName: songDetails.body.title,
          songArtists:
            songDetails.body.artists.length > 0
              ? songDetails.body.artists
              : ["Not Found"],
        });
        break;
      }
      case "openingsmoe": {
        const oMResponse: any = await p({
          method: "GET",
          url: "https://openings.moe/api/list.php",
          parse: "json",
        }).catch((e) => {
          return res.status(HttpCodes.InternalError).send(e);
        });

        const songs = oMResponse.body;
        const songDetails = songs[Math.floor(Math.random() * songs.length)];
        const oMDetails: any = await p({
          method: "GET",
          url: `https://openings.moe/api/details.php?name=${songDetails.uid}`,
          parse: "json",
        });
        const song: OpeningsMoeResponse = oMDetails.body;

        song.file = `https://openings.moe/video/${song.file}.webm`;

        res.json({
          name: song.source,
          link: song.file,
          type: `${song.title.includes("Opening") ? "OP" : "ED"}`,
          songName: song.song ? song.song.title : "Not Found",
          songArtists: song.song ? [song.song.artist] : ["Not Found"],
        });
        break;
      }
    }
  },
  /**
    Get a random theme from a specified year.
   */
  async getRandomThemeFromYear(req: Request, res: Response) {
    const { year } = req.query;

    if (!year)
      return res.status(HttpCodes.Bad_Request).json({
        err: "no_year_query",
        message: "A year was not specified.",
      });

    const atResponse: any = await p({
      method: "GET",
      url: `https://staging.animethemes.moe/api/anime?filter[year]=${year}`,
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
      "v.staging.animethemes.moe",
      "animethemes.moe/video"
    );

    const songDetails: any = await p({
      method: "GET",
      url: `https://staging.animethemes.moe/api/song/${anime.themes[0].id}`,
      parse: "json",
    });

    res.json({
      name: anime.name,
      link: animeLink,
      type: anime.themes[0].type,
      songName: songDetails.body.title,
      songArtists:
        songDetails.body.artists.length > 0
          ? songDetails.body.artists
          : ["Not Found"],
    });
  },
  /**
    Search a anime from a specified provider.
   */
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
          url: `https://staging.animethemes.moe/api/search?q=${value}&limit=1&fields=videos`,
          parse: "json",
        }).catch((e) => {
          return res.status(HttpCodes.InternalError).send(e);
        });

        if (atResponse.body.anime.length > 0) {
          const animes = atResponse.body.anime;
          const anime = animes[Math.floor(Math.random() * animes.length)];

          const animeLink = anime.themes[0].entries[0].videos[0].link.replace(
            "v.staging.animethemes.moe",
            "animethemes.moe/video"
          );

          const songDetails: any = await p({
            method: "GET",
            url: `https://staging.animethemes.moe/api/song/${anime.themes[0].id}`,
            parse: "json",
          });

          res.json({
            name: anime.name,
            link: animeLink,
            type: anime.themes[0].type,
            songName: songDetails.body.title,
            songArtists:
              songDetails.body.artists.length > 0
                ? songDetails.body.artists
                : ["Not Found"],
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
        }).catch((e) => {
          return res.status(HttpCodes.InternalError).send(e);
        });

        const songs = oMResponse.body;
        const songDetails = songs.filter((s) => s.source === value)[0];

        if (!songDetails)
          return res.status(HttpCodes.Bad_Request).json({
            err: "no_anime",
            message: "There are no anime.",
          });

        const oMDetails: any = await p({
          method: "GET",
          url: `https://openings.moe/api/details.php?name=${songDetails.uid}`,
          parse: "json",
        });
        const song: OpeningsMoeResponse = oMDetails.body;

        song.file = `https://openings.moe/video/${song.file}.webm`;

        res.json({
          name: song.source,
          link: song.file,
          type: `${song.title.includes("Opening") ? "OP" : "ED"}`,
          songName: song.song ? song.song.title : "Not Found",
          songArtists: song.song ? [song.song.artist] : ["Not Found"],
        });
        break;
      }
    }
  },
  /**
    Fetch providers statuses.
   */
  async serverStatus(req: Request, res: Response) {
    const animethemes = await axios.get(
      "https://raw.githubusercontent.com/RitsuProject/ritsu-status/master/history/anime-themes.yml"
    );
    const animeThemesAPI = await axios.get(
      "https://raw.githubusercontent.com/RitsuProject/ritsu-status/master/history/anime-themes-api.yml"
    );
    const openingsMoe = await axios.get(
      "https://raw.githubusercontent.com/RitsuProject/ritsu-status/master/history/openings-moe.yml"
    );
    const animeThemesUPTime = yaml.parse(animethemes.data);
    const animeThemesAPIUPTime = yaml.parse(animeThemesAPI.data);
    const openingsmoeUPTime = yaml.parse(openingsMoe.data);
    res.json({
      animethemes:
        animeThemesUPTime.status === "up" &&
        animeThemesAPIUPTime.status === "up"
          ? "online"
          : "offline",
      openingsmoe: openingsmoeUPTime.status === "up" ? "online" : "offline",
    });
  },
};
