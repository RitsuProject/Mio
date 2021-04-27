import { ThemeDocument } from '../database/entities/Theme'

export function getVideoUrl(theme: ThemeDocument) {
  const useFallback = process.env.USE_FALLBACK === 'true'

  let video_url = theme.versions[0].sources[0].url

  if (useFallback) {
    video_url = theme.versions[0].sources[0].url.replace(
      'https://animethemes.moe',
      process.env.FALLBACK_URL
    )
  }

  return video_url
}
