import phin from "phin";

interface MeResponse {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
}

export default async function checkPermissions(
  token: string
): Promise<MeResponse> {
  const guildsResponse: any = await phin({
    method: "GET",
    url: "https://discordapp.com/api/users/@me",
    headers: {
      Authorization: token,
    },
    parse: "json",
  });

  if (guildsResponse.statusCode === 200) {
    console.log("ok!!");
    return guildsResponse.body;
  } else {
    console.log(guildsResponse.body);
    return null;
  }
}
