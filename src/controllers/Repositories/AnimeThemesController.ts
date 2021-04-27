import { Request, Response } from 'express'
import Series from '../../database/entities/Series'
import Theme from '../../database/entities/Theme'
import getRandomTheme from '../../util/getRandomTheme'
import getRandomThemeByMALID from '../../util/getRandomThemeByMALID'
import getRandomThemeByYear from '../../util/getRandomThemeByYear'
import getThemeTypeByID from '../../util/getThemeTypeByID'
import { getVideoUrl } from '../../util/getVideoUrl'

export default {
  async getRandomTheme(req: Request, res: Response) {
    const randomTheme = await getRandomTheme()
    const series = await Series.findById(randomTheme.series)
    const video_url = getVideoUrl(randomTheme)

    res.json({
      malId: randomTheme.series,
      name: series.title,
      link: video_url,
      type: getThemeTypeByID(randomTheme.type),
      songName: randomTheme.title,
      songArtists: ['Not Found'],
    })
  },

  async getRandomThemeFromYear(req: Request, res: Response) {
    const year = req.query.year
    if (!year)
      return res.status(400).json({
        err: 'no_query',
        message: 'No query has specified.',
      })
    const yearInt = parseInt(year.toString())
    const series = await getRandomThemeByYear(yearInt)

    if (!series)
      return res.status(400).json({
        err: 'no_anime',
        message: 'No anime was found with this year.',
      })

    const theme = await Theme.findOne({ series: series.id })
    const video_url = getVideoUrl(theme)

    res.json({
      malId: series.id,
      name: series.title,
      link: video_url,
      type: getThemeTypeByID(theme.type),
      songName: theme.title,
      songArtists: ['Not Found'],
    })
  },

  async searchByMalID(req: Request, res: Response) {
    const { malId } = req.query
    const malIdInt = parseInt(malId.toString())
    if (isNaN(malIdInt))
      return res.status(400).json({
        err: 'query_is_NaN',
        message: 'Query is not a number.',
      })

    const randomTheme = await getRandomThemeByMALID(malIdInt)
    if (!randomTheme)
      return res.status(400).json({
        err: 'no_anime',
        message: 'Not found any anime with this MAL ID.',
      })
    const series = await Series.findById(randomTheme.series)
    const video_url = getVideoUrl(randomTheme)

    res.json({
      malId: randomTheme.series,
      name: series.title,
      link: video_url,
      type: getThemeTypeByID(randomTheme.type),
      songName: randomTheme.title,
      songArtists: ['Not Found'],
    })
  },
}
