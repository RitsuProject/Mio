import Theme from '../database/entities/Theme'

export default async function getRandomTheme() {
  // Sometimes the sources array is empty, so, this condition will check if at least 1 entry exists.
  const sourceUrlExists = {
    'versions.0.sources.0': { $exists: true },
  }

  const count = await Theme.countDocuments(sourceUrlExists)
  const randomNumber = Math.floor(Math.random() * count)
  const randomTheme = await Theme.findOne(sourceUrlExists)
    .skip(randomNumber)
    .exec()

  return randomTheme
}
