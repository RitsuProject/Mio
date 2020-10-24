import { NextFunction, Request, Response } from "express";

import getUserObject from "../discord/auth/getUserObject";
import client from "../discord/bot/client";
export default async function verifyPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("authorization");
  const { id } = req.params;

  console.log(req.header("authorization"));

  if (!token)
    return res.status(400).json({
      err: "bad_request",
      message: "Invalid Token.",
    });

  const user = await getUserObject(token);
  if (user === null)
    return res.status(400).json({
      err: "bad_request",
      message: "Invalid Token.",
    });
  const cachedGuild = client.guilds.cache.get(id);
  if (cachedGuild === undefined)
    return res.status(400).json({
      err: "bad_request",
      message: "Ritsu did not find this server.",
    });
  const cachedUser = cachedGuild.members.cache.get(user.id);

  if (cachedUser != undefined) {
    if (!cachedUser.hasPermission("ADMINISTRATOR")) {
      return res.status(401).json({
        err: "unauthorized",
        message: "Insufficient permissions.",
      });
    } else {
      next();
    }
  } else {
    return res.status(403).json({
      err: "forbidden",
      message: "The current user is not in the requested guild.",
    });
  }
}
