import { CHOICE_IDS, type ChoiceId } from "../config/choices";

// Must match the number of rows inserted by migrations/0001_init.sql.
// Shown to participants so the starting point is never mistaken for real data.
export const SAMPLE_BASELINE_COUNT = 24;

export interface ResultsPayload {
  totals: Record<ChoiceId, number>;
  totalCount: number;
  // Every choice currently sharing the highest count — length 1 means a
  // sole leader, length > 1 means a tie for the lead. Empty only when
  // totalCount is 0 (no responses at all).
  mostPopularIds: ChoiceId[];
  sampleBaselineCount: number;
}

interface CountRow {
  choice_id: ChoiceId;
  total: number;
}

function isChoiceId(value: unknown): value is ChoiceId {
  return typeof value === "string" && (CHOICE_IDS as string[]).includes(value);
}

async function buildResultsPayload(db: D1Database): Promise<ResultsPayload> {
  const { results } = await db
    .prepare("SELECT choice_id, COUNT(*) as total FROM responses GROUP BY choice_id")
    .all<CountRow>();

  const totals = Object.fromEntries(
    CHOICE_IDS.map((id) => [id, 0])
  ) as Record<ChoiceId, number>;

  let totalCount = 0;
  let maxCount = 0;

  for (const row of results ?? []) {
    if (!isChoiceId(row.choice_id)) continue;
    totals[row.choice_id] = row.total;
    totalCount += row.total;
    if (row.total > maxCount) {
      maxCount = row.total;
    }
  }

  // Collect every choice at the max count, in canonical CHOICE_IDS order,
  // rather than picking a single arbitrary "winner" — this is what makes
  // an exact tie for the lead detectable instead of silently hidden.
  const mostPopularIds = maxCount > 0 ? CHOICE_IDS.filter((id) => totals[id] === maxCount) : [];

  return { totals, totalCount, mostPopularIds, sampleBaselineCount: SAMPLE_BASELINE_COUNT };
}

export async function getResults(db: D1Database): Promise<ResultsPayload> {
  return buildResultsPayload(db);
}

export class InvalidChoiceError extends Error {
  constructor(value: unknown) {
    super(`"${String(value)}" is not a valid choice id.`);
    this.name = "InvalidChoiceError";
  }
}

export async function submitChoice(
  db: D1Database,
  choiceId: unknown
): Promise<ResultsPayload> {
  if (!isChoiceId(choiceId)) {
    throw new InvalidChoiceError(choiceId);
  }

  await db
    .prepare("INSERT INTO responses (choice_id) VALUES (?)")
    .bind(choiceId)
    .run();

  return buildResultsPayload(db);
}
