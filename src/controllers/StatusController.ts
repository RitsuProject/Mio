import axios from 'axios'
import yaml from 'yaml'
import { Request, Response } from 'express'

export default {
  async getRepositorysStatus(req: Request, res: Response) {
    const animethemes = await axios.get(
      'https://raw.githubusercontent.com/RitsuProject/ritsu-status/master/history/anime-themes.yml'
    )
    const animeThemesAPI = await axios.get(
      'https://raw.githubusercontent.com/RitsuProject/ritsu-status/master/history/anime-themes-api.yml'
    )
    const openingsMoe = await axios.get(
      'https://raw.githubusercontent.com/RitsuProject/ritsu-status/master/history/openings-moe.yml'
    )
    const animeThemesUPTime = yaml.parse(animethemes.data)
    const animeThemesAPIUPTime = yaml.parse(animeThemesAPI.data)
    const openingsmoeUPTime = yaml.parse(openingsMoe.data)
    res.json({
      animethemes:
        animeThemesUPTime.status === 'up' &&
        animeThemesAPIUPTime.status === 'up'
          ? 'online'
          : 'offline',
      openingsmoe: openingsmoeUPTime.status === 'up' ? 'online' : 'offline',
    })
  },
}
