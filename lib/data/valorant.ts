export type ValorantStats = {
  riotName: string;
  riotTag: string;
  accountLevel: number;
  currentTier: string;
  rankIconUrl: string | null;
  rr: number;
  elo: number;
  mmrChange: number;
};

const RIOT_NAME = process.env.RIOT_NAME ?? "Shout";
const RIOT_TAG = process.env.RIOT_TAG ?? "Amxn";
const RIOT_REGION = process.env.RIOT_REGION ?? "ap";
const API_KEY = process.env.HENRIKDEV_API_KEY;

export async function getValorantStats(): Promise<ValorantStats | null> {
  if (!API_KEY) return null;

  const fetchOpts = {
    next: { revalidate: 3600 },
    headers: { Authorization: API_KEY },
  };

  try {
    const [accountRes, mmrRes] = await Promise.all([
      fetch(`https://api.henrikdev.xyz/valorant/v1/account/${RIOT_NAME}/${RIOT_TAG}`, fetchOpts),
      fetch(`https://api.henrikdev.xyz/valorant/v2/mmr/${RIOT_REGION}/${RIOT_NAME}/${RIOT_TAG}`, fetchOpts),
    ]);
    if (!accountRes.ok || !mmrRes.ok) return null;

    const accountJson = await accountRes.json();
    const mmrJson = await mmrRes.json();

    const account = accountJson?.data;
    const current = mmrJson?.data?.current_data;
    if (!account || !current) return null;

    return {
      riotName: account.name,
      riotTag: account.tag,
      accountLevel: account.account_level,
      currentTier: current.currenttierpatched ?? "Unranked",
      rankIconUrl: current.images?.small ?? null,
      rr: current.ranking_in_tier ?? 0,
      elo: current.elo ?? 0,
      mmrChange: current.mmr_change_to_last_game ?? 0,
    };
  } catch {
    return null;
  }
}
