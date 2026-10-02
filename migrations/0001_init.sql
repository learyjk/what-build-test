-- Schema for "What will you build next?"
-- One row per submission. Aggregates (totals, most popular) are computed
-- with GROUP BY at read time rather than maintained as separate counters,
-- so there is nothing to keep in sync.

CREATE TABLE IF NOT EXISTS responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  choice_id TEXT NOT NULL CHECK (
    choice_id IN ('interactive-tool', 'live-data', 'signed-in-portal', 'standalone-app')
  ),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_responses_choice_id ON responses (choice_id);

-- Seed data: 24 sample responses across all four choices, so the first
-- real submission lands on a result that already feels meaningful.
INSERT INTO responses (choice_id, created_at) VALUES
  ('interactive-tool', '2026-08-01 09:12:00'),
  ('interactive-tool', '2026-08-03 14:45:00'),
  ('interactive-tool', '2026-08-05 11:20:00'),
  ('interactive-tool', '2026-08-09 16:03:00'),
  ('interactive-tool', '2026-08-12 08:37:00'),
  ('interactive-tool', '2026-08-15 19:52:00'),
  ('interactive-tool', '2026-08-19 13:10:00'),
  ('interactive-tool', '2026-08-24 10:44:00'),
  ('live-data', '2026-08-02 10:05:00'),
  ('live-data', '2026-08-06 15:22:00'),
  ('live-data', '2026-08-10 09:47:00'),
  ('live-data', '2026-08-14 17:36:00'),
  ('live-data', '2026-08-18 12:15:00'),
  ('live-data', '2026-08-22 20:08:00'),
  ('signed-in-portal', '2026-08-04 08:55:00'),
  ('signed-in-portal', '2026-08-11 14:30:00'),
  ('signed-in-portal', '2026-08-17 11:18:00'),
  ('signed-in-portal', '2026-08-25 09:41:00'),
  ('standalone-app', '2026-08-03 07:29:00'),
  ('standalone-app', '2026-08-07 13:52:00'),
  ('standalone-app', '2026-08-13 18:04:00'),
  ('standalone-app', '2026-08-16 10:37:00'),
  ('standalone-app', '2026-08-21 15:49:00'),
  ('standalone-app', '2026-08-26 12:02:00');
