import { Router } from "express";
const routes = Router();

routes.get("/", (req, res) => {
  res.send("Hello World");
});

// == [ ENDPOINTS ] ==
// -> Version: 1
// -> Description: All API endpoints specified here.

export default routes;
