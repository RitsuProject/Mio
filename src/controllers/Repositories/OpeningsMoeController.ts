import axios from 'axios'
import { Request, Response } from 'express'
import { redis } from '../../database/Redis'
import OpeningsMoeDetails from '../../interfaces/OpeningsMoeDetails'
import OpeningsMoeList from '../../interfaces/OpeningsMoeList'

export default {
  async getRandomTheme(req: Request, res: Response) {
    const themeType = req.query.type || 'both'
    // Try to get the openings.moe list from the cache.
    const cachedList = await redis.get('openingsmoe:list')
    let openingsMoeList = JSON.parse(cachedList) as OpeningsMoeList[]
    if (!cachedList) {
      const requestedList = await axios.get<OpeningsMoeList[]>(
        'https://openings.moe/api/list.php'
      )
      await redis.set('openingsmoe:list', JSON.stringify(requestedList.data))
      openingsMoeList = requestedList.data
    }

    const themeTypeFormated =
      themeType === 'openings'
        ? 'Opening'
        : themeType === 'endings'
        ? 'Ending'
        : 'both'

    const songs = openingsMoeList.filter((song) =>
      themeTypeFormated !== 'both' ? song.uid.includes(themeTypeFormated) : true
    )
    const songDetails = songs[Math.floor(Math.random() * songs.length)]

    // Try to get the song details from the cache
    const cachedSongDetails = await redis.get(`openingsmoe:${songDetails.uid}`)
    let song = JSON.parse(cachedSongDetails) as OpeningsMoeDetails

    if (!cachedSongDetails) {
      const requestedSongDetails = await axios.get<OpeningsMoeDetails>(
        `https://openings.moe/api/details.php?name=${encodeURI(
          songDetails.uid
        )}`
      )
      await redis.set(
        `openingsmoe:${songDetails.uid}`,
        JSON.stringify(requestedSongDetails.data)
      )
      song = requestedSongDetails.data
    }

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

    // Try to get the openings.moe list from the cache.
    const cachedList = await redis.get('openingsmoe:list')
    let openingsMoeList = JSON.parse(cachedList) as OpeningsMoeList[]
    if (!cachedList) {
      const requestedList = await axios.get<OpeningsMoeList[]>(
        'https://openings.moe/api/list.php'
      )
      await redis.set('openingsmoe:list', JSON.stringify(requestedList.data))
      openingsMoeList = requestedList.data
    }

    const themeTypeFormated =
      themeType === 'openings'
        ? 'Opening'
        : themeType === 'endings'
        ? 'Ending'
        : 'both'

    const songs = openingsMoeList.filter((song) =>
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

    // Try to get the song details from the cache
    const cachedSongDetails = await redis.get(`openingsmoe:${songDetails.uid}`)
    let song = JSON.parse(cachedSongDetails) as OpeningsMoeDetails

    if (!cachedSongDetails) {
      const requestedSongDetails = await axios.get<OpeningsMoeDetails>(
        `https://openings.moe/api/details.php?name=${encodeURI(
          songDetails.uid
        )}`
      )
      await redis.set(
        `openingsmoe:${songDetails.uid}`,
        JSON.stringify(requestedSongDetails.data)
      )
      song = requestedSongDetails.data
    }

    song.file = `https://openings.moe/video/${song.file}.webm`

    await redis.set(songDetails.uid, JSON.stringify(song))

    res.json({
      name: song.source,
      link: song.file,
      type: `${song.title.includes('Opening') ? 'OP' : 'ED'}`,
      songName: song.song ? song.song.title : 'Not Found',
      songArtists: song.song ? [song.song.artist] : ['Not Found'],
    })
  },
}
