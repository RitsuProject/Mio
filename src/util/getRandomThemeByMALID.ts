import Theme from '../database/entities/Theme'

export default async function getRandomThemeByMALID(
  malId: number,
  themeType: string
) {
  const themeTypeFormated =
    themeType === 'openings' ? '0' : themeType === 'endings' ? '1' : 'both'
  const conditions = {
    series: malId,
    type:
      themeTypeFormated !== 'both'
        ? themeTypeFormated
        : {
            $exists: true,
          },
  }

  const themes = await Theme.find(conditions)
  if (!themes) return false
  const randomTheme = themes[Math.floor(Math.random() * themes.length)]

  return randomTheme
}
