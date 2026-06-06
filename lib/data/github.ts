export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionsData = {
  username: string;
  totalLastYear: number;
  weeks: ContributionDay[][];
};

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? "Valtryek";

/** Groups a flat day list into Sunday-aligned week columns, matching GitHub's own grid. */
function groupIntoWeeks(days: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  days.forEach((day, index) => {
    const dayOfWeek = new Date(`${day.date}T00:00:00Z`).getUTCDay();
    if (index === 0) {
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push({ date: "", count: 0, level: 0 });
      }
    }
    currentWeek.push(day);
    if (dayOfWeek === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length) weeks.push(currentWeek);
  return weeks;
}

export async function getGithubContributions(): Promise<ContributionsData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 21600 } },
    );
    if (!res.ok) return null;

    const json = (await res.json()) as {
      total: { lastYear: number };
      contributions: ContributionDay[];
    };

    return {
      username: GITHUB_USERNAME,
      totalLastYear: json.total.lastYear,
      weeks: groupIntoWeeks(json.contributions),
    };
  } catch {
    return null;
  }
}
