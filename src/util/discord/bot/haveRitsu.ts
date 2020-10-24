import client from "./client";

export default function haveRitsu(id: string) {
  return client.guilds.cache.get(id) != undefined;
}
