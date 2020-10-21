import { Router } from "express";
import ThemesController from "src/controllers/ThemesController";
const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

// == [ THEMES ENDPOINTS ] ==
// -> Version: 1
// -> Description: Used as a proxy to control themes paid by Ritsu.

routes.get("/themes/random", ThemesController.getRandomTheme);

export default routes;
