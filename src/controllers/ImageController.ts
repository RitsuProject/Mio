import { Request, Response } from "express";
import CanvasGen from "../util/CanvasGen";
import HttpCodes from "../util/codes";
require("express-async-errors");

export default {
  /**
    Generate the answer card V1
    @deprecated
   */
  async gen(req: Request, res: Response) {
    const { name, cover, type } = req.query;

    if (!name || !cover || !type)
      return res.status(HttpCodes.Bad_Request).json({
        err: "no_correct_query",
        message: "A query was not specified.",
      });

    const buff = await CanvasGen.answerCard(name, cover, type);

    res.contentType("image/png");
    res.end(buff);
  },
  /**
    Generate the answer card.
    @restricted API Key required.
   */
  async genV2(req: Request, res: Response) {
    const { name, cover, type, apiKey } = req.body;

    if (!name || !cover || !type || !apiKey)
      return res.status(HttpCodes.Bad_Request).json({
        err: "no_correct_query",
        message: "A correct query was not specified.",
      });

    if (apiKey != process.env.API_KEY)
      return res.status(HttpCodes.Bad_Request).json({
        err: "invalid_api_key",
        message: "Invalid API_KEY",
      });

    const buff = await CanvasGen.answerCard(name, cover, type);

    res.contentType("image/png");
    res.end(buff);
  },
};
