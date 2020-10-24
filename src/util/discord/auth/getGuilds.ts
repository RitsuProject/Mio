import phin from "phin";
import Discord from "discord.js";
import haveRitsu from "../bot/haveRitsu";

export default async function getGuilds(token: string) {
  const guildsResponse: any = await phin({
    method: "GET",
    url: "https://discordapp.com/api/users/@me/guilds",
    headers: {
      Authorization: token,
    },
    parse: "json",
  });

  if (guildsResponse.statusCode === 200) {
    const guildsWithAdmin = [];

    for (const g in guildsResponse.body) {
      const guild = guildsResponse.body[g];
      const perms = new Discord.Permissions(guild.permissions);

      if (perms.has("ADMINISTRATOR")) {
        guildsWithAdmin.push({
          id: guild.id,
          name: guild.name,
          icon: guild.icon,
          owner: guild.owner,
          haveRitsu: haveRitsu(guild.id),
        });
      }
    }
    return guildsWithAdmin;
  }
}
