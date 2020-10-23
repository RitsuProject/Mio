import { Request, Response } from "express";
import CanvasGen from "../util/CanvasGen";
import HttpCodes from "../util/codes";

export default {
  async gen(req: Request, res: Response) {
    const { name, cover, type } = req.query;

    if (!name || !cover || !type)
      return res.status(HttpCodes.Bad_Request).json({
        err: "no_correct_query",
        message: "A query was not specified.",
      });

    const buff = await CanvasGen.answserCard(name, cover, type);

    res.contentType("image/png");
    res.end(buff);
  },
};
