import { Router } from "express";
import ImageController from "src/controllers/ImageController";
import ThemesController from "../controllers/ThemesController";
const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

routes.get("/themes/random", ThemesController.getRandomTheme); // Get random theme from Openings.moe/AnimeThemes
routes.get("/themes/random/year", ThemesController.getRandomThemeFromYear); // Get random theme using year filter.

routes.get("/image/answser", ImageController.gen); // Generate the answser card.

export default routes;
