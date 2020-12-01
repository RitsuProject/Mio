import { Request, Response } from "express";
import CanvasGen from "../util/CanvasGen";
import HttpCodes from "../util/codes";

export default {
  /**
    Generate the answer card.
    @restricted API Key required.
   */
  async gen(req: Request, res: Response) {
    const { name, cover, type, apiKey } = req.query;

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
