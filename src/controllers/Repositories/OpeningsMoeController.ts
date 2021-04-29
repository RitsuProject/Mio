import axios from 'axios'
import { Request, Response } from 'express'
import OpeningsMoeDetails from '../../interfaces/OpeningsMoeDetails'
import OpeningsMoeList from '../../interfaces/OpeningsMoeList'

export default {
  async getRandomTheme(req: Request, res: Response) {
    const themeType = req.query.type || 'both'
    const oMResponse = await axios.get<OpeningsMoeList[]>(
      'https://openings.moe/api/list.php'
    )

    const themeTypeFormated =
      themeType === 'openings'
        ? 'Opening'
        : themeType === 'endings'
        ? 'Ending'
        : 'both'

    const songs = oMResponse.data.filter((song) =>
      themeTypeFormated !== 'both' ? song.uid.includes(themeTypeFormated) : true
    )
    const songDetails = songs[Math.floor(Math.random() * songs.length)]
    const oMDetails = await axios.get<OpeningsMoeDetails>(
      `https://openings.moe/api/details.php?name=${encodeURI(songDetails.uid)}`
    )
    const song = oMDetails.data

    song.file = `https://openings.moe/video/${song.file}.webm`

    res.json({
      name: song.source,
      link: song.file,
      type: `${song.title.includes('Opening') ? 'OP' : 'ED'}`,
      songName: song.song ? song.song.title : 'Not Found',
      songArtists: song.song ? [song.song.artist] : ['Not Found'],
    })
  },

  async searchAnimeByTitle(req: Request, res: Response) {
    const title = req.query.title
    const themeType = req.query.type || 'both'

    if (!title)
      return res.status(400).json({
        err: 'no_query',
        message: 'No query has specified.',
      })
    const oMResponse = await axios.get<OpeningsMoeList[]>(
      'https://openings.moe/api/list.php'
    )

    const themeTypeFormated =
      themeType === 'openings'
        ? 'Opening'
        : themeType === 'endings'
        ? 'Ending'
        : 'both'

    const songs = oMResponse.data.filter((song) =>
      themeTypeFormated !== 'both' ? song.uid.includes(themeTypeFormated) : true
    )
    const songDetails = songs.filter(
      (s: OpeningsMoeList) => s.source === title.toString()
    )[0]
    if (!songDetails)
      return res.status(400).json({
        err: 'no_anime',
        message: 'There are no anime.',
      })

    const oMDetails = await axios.get<OpeningsMoeDetails>(
      `https://openings.moe/api/details.php?name=${encodeURI(songDetails.uid)}`
    )
    const song = oMDetails.data

    song.file = `https://openings.moe/video/${song.file}.webm`

    res.json({
      name: song.source,
      link: song.file,
      type: `${song.title.includes('Opening') ? 'OP' : 'ED'}`,
      songName: song.song ? song.song.title : 'Not Found',
      songArtists: song.song ? [song.song.artist] : ['Not Found'],
    })
  },
}
