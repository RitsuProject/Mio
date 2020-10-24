import { Router } from "express";
import verifyPermission from "../util/middlewares/verifyPermission";
import GuildsController from "../controllers/GuildsController";
import ImageController from "../controllers/ImageController";
import ThemesController from "../controllers/ThemesController";
const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

routes.get("/themes/random", ThemesController.getRandomTheme); // Get random theme from Openings.moe/AnimeThemes
routes.get("/themes/random/year", ThemesController.getRandomThemeFromYear); // Get random theme using year filter.

routes.get("/image/answser", ImageController.gen); // Generate the answser card.

routes.get("/guilds/:id/config", verifyPermission, GuildsController.config); // Get the server config.
routes.patch(
  "/guilds/:id/config",
  verifyPermission,
  GuildsController.updateConfig
); // Update server config.

export default routes;
