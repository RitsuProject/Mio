import axios from 'axios'
import { Request, Response } from 'express'
import OpeningsMoeResponse from '../../interfaces/OpeningsMoeResponse'

export default {
  async getRandomTheme(req: Request, res: Response) {
    const oMResponse = await axios.get('https://openings.moe/api/list.php')

    const songs = oMResponse.data
    const songDetails = songs[Math.floor(Math.random() * songs.length)]
    const oMDetails = await axios.get<OpeningsMoeResponse>(
      `https://openings.moe/api/details.php?name=${songDetails.uid}`
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
    const { title } = req.query
    if (!title)
      return res.status(400).json({
        err: 'no_query',
        message: 'No query has specified.',
      })
    const oMResponse = await axios.get('https://openings.moe/api/list.php')

    const songs = oMResponse.data
    const songDetails = songs.filter(
      (s: OpeningsMoeResponse) => s.source === title
    )[0]
    if (!songDetails)
      return res.status(400).json({
        err: 'no_anime',
        message: 'There are no anime.',
      })

    const oMDetails = await axios.get<OpeningsMoeResponse>(
      `https://openings.moe/api/details.php?name=${songDetails.uid}`
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
