import { Request, Response } from "express";
import Guilds from "../models/Guild";
import client from "../util/discord/bot/client";

export default {
  async config(req: Request, res: Response) {
    const { id } = req.params;

    const guild = await Guilds.findById(id);

    const cachedGuild = client.guilds.cache.get(id);

    const channels = cachedGuild.channels.cache.filter(
      (c) => c.type === "text" && c.viewable
    );

    return res.json({
      guild: guild,
      guildIcon: cachedGuild.iconURL(),
      channels: channels,
    });
  },
  async updateConfig(req: Request, res: Response) {
    const { id } = req.params;
    const { config } = req.body;

    if (config.prefix === undefined || config.provider === undefined)
      return res.status(400).json({
        err: "bad_request",
        message: "Invalid prefix/provider.",
      });

    const guild = await Guilds.findById(id);

    await guild.updateOne({
      prefix: config.prefix,
      provider: config.provider,
    });
    return res.json({
      err: false,
      message: "OK",
    });
  },
};
