import { readFile } from "node:fs/promises";
import path from "node:path";

const CASE_STUDY_IDS = ["avmg", "projectteams", "solarvistar", "kropigo"] as const;

export function hasCaseStudy(id: string): boolean {
  return (CASE_STUDY_IDS as readonly string[]).includes(id);
}

export async function getCaseStudy(id: string): Promise<string | null> {
  if (!hasCaseStudy(id)) return null;

  const filePath = path.join(process.cwd(), "lib/data/caseStudies", `${id}.md`);
  return readFile(filePath, "utf-8");
}
