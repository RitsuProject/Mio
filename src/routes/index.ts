import { Router } from "express";
import ThemesController from "../controllers/ThemesController";
const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

// == [ THEMES ENDPOINTS ] ==
// -> Version: 1
// -> Description: Used as a proxy to control themes paid by Ritsu.

routes.get("/themes/random", ThemesController.getRandomTheme);
routes.get("/themes/random/year", ThemesController.getRandomThemeFromYear);

export default routes;
