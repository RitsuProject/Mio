import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { resolve } from "path";
import connect from "./util/db";
import routes from "./routes";
import { readFileSync } from "fs";

require("express-async-errors");

config({ path: resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;
connect(process.env.MONGOURI);

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");
app.use(routes);

app.listen(PORT, () => {
  console.log(readFileSync("title.txt", "utf8").toString());
  console.log(`[WebServer] Running at ${PORT}`);
});
