import Theme from '../database/entities/Theme'

export default async function getRandomThemeByMALID(malId: number) {
  const themes = await Theme.find({ series: malId })
  if (!themes) return false
  const randomTheme = themes[Math.floor(Math.random() * themes.length)]

  return randomTheme
}
