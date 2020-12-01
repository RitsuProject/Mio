import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { resolve } from "path";
import connect from "./util/db";
import routes from "./routes";
import { readFileSync } from "fs";
import bodyParser from "body-parser";

require("express-async-errors");

config({ path: resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, async () => {
  connect(process.env.MONGOURI); // Connect to the database
  console.log(readFileSync("title.txt", "utf8").toString());
  console.log(`[WebServer] Running at ${PORT}`);
});
