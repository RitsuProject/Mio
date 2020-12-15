import { Router } from "express";
import ImageController from "../controllers/ImageController";
import ThemesController from "../controllers/ThemesController";
require("express-async-errors");
const routes = Router();

routes.get("/", (_, res) => {
  res.redirect("https://ritsu.sazz.fail");
});

routes.get("/themes/random", ThemesController.getRandomTheme); // Get random theme from Openings.moe/AnimeThemes
routes.get("/themes/random/year", ThemesController.getRandomThemeFromYear); // Get random theme using year filter.
routes.get("/themes/status", ThemesController.serverStatus); // Get providers statuses.
routes.get("/themes/search", ThemesController.searchAnime); // Search a theme from specified providers.

routes.post("/image/answser", ImageController.genV2); // Generate the answser card V2

export default routes;
