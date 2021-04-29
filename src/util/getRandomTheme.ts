import Theme from '../database/entities/Theme'

export default async function getRandomTheme(themeType: string) {
  const themeTypeFormated =
    themeType === 'openings' ? '0' : themeType === 'endings' ? '1' : 'both'
  const conditions = {
    // Sometimes the sources array is empty, so, this condition will check if at least 1 entry exists.
    'versions.0.sources.0': { $exists: true },

    // Filter by the theme type specified, if is both, just select any theme that the type field exists.
    type:
      themeTypeFormated !== 'both'
        ? themeTypeFormated
        : {
            $exists: true,
          },
  }

  const count = await Theme.countDocuments(conditions)
  const randomNumber = Math.floor(Math.random() * count)
  const randomTheme = await Theme.findOne(conditions).skip(randomNumber).exec()

  return randomTheme
}
