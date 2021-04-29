import Series from '../database/entities/Series'

export default async function getRandomThemeByYear(year: number) {
  const series = await Series.find({
    season: { year: year, quarter: 0 },
  })
  const randomTheme = series[Math.floor(Math.random() * series.length)]

  return randomTheme
}
