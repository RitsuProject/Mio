import { Router } from 'express'
import AnimeThemesController from '../controllers/Repositories/AnimeThemesController'
import OpeningsMoeController from '../controllers/Repositories/OpeningsMoeController'
import StatusController from '../controllers/StatusController'
require('express-async-errors')
const routes = Router()

routes.get('/api', (_, res) => {
  res.redirect('https://ritsu.fun')
})

routes.get('/api/v3/themes/status', StatusController.getRepositorysStatus)

// AnimeThemes

routes.get(
  '/api/v3/themes/animethemes/random',
  AnimeThemesController.getRandomTheme
)
routes.get(
  '/api/v3/themes/animethemes/perYear',
  AnimeThemesController.getRandomThemeFromYear
)
routes.get(
  '/api/v3/themes/animethemes/search',
  AnimeThemesController.searchByMalID
)

// Openings.moe

routes.get(
  '/api/v3/themes/openingsmoe/random',
  OpeningsMoeController.getRandomTheme
)

routes.get(
  '/api/v3/themes/openingsmoe/search',
  OpeningsMoeController.searchAnimeByTitle
)

export default routes
