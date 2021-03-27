import Theme from '../database/entities/Theme'

export default async function getRandomTheme() {
  const count = await Theme.countDocuments()
  const randomNumber = Math.floor(Math.random() * count)
  const randomTheme = await Theme.findOne().skip(randomNumber).exec()

  return randomTheme
}
