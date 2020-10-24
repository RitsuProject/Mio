import { Request, Response } from "express";
import getGuilds from "../util/discord/auth/getGuilds";

export default {
  async getGuilds(req: Request, res: Response) {
    const { token } = req.body;

    if (!token)
      return res.status(400).json({
        err: "bad_request",
        message: "Invalid Token.",
      });

    const guilds = await getGuilds(token);

    res.json(guilds);
  },
};
