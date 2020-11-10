import { Router } from "express";
import verifyPermission from "../util/middlewares/verifyPermission";
import GuildsController from "../controllers/GuildsController";
import ImageController from "../controllers/ImageController";
import ThemesController from "../controllers/ThemesController";
import UserController from "../controllers/UserController";
const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

routes.get("/themes/random", ThemesController.getRandomTheme); // Get random theme from Openings.moe/AnimeThemes
routes.get("/themes/random/year", ThemesController.getRandomThemeFromYear); // Get random theme using year filter.
routes.get("/themes/status", ThemesController.serverStatus); // Get servers statuses.
routes.post("/themes/add", ThemesController.addTheme); // Add a theme to Tsumugi
routes.get("/themes/search", ThemesController.searchAnime);

routes.get("/image/answser", ImageController.gen); // Generate the answser card.

routes.get("/user/guilds", UserController.getGuilds); // Get user guilds.

routes.get("/guilds/:id/config", verifyPermission, GuildsController.config); // Get the server config.
routes.patch(
  "/guilds/:id/config",
  verifyPermission,
  GuildsController.updateConfig
); // Update server config.

export default routes;
