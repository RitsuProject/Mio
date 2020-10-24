import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { resolve } from "path";
import connect from "./util/db";
import routes from "./routes";
import { readFileSync } from "fs";
import client from "./util/discord/bot/client";
import cookieParser from "cookie-parser";

require("express-async-errors");

config({ path: resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;
connect(process.env.MONGOURI);

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(routes);

app.listen(PORT, async () => {
  console.log(readFileSync("title.txt", "utf8").toString());
  client.login(process.env.DISCORD_TOKEN);
  console.log(`[WebServer] Running at ${PORT}`);
});
