# Accountant I — training app

Application-first, mobile-delivered training program for a county Accountant I role.
Built from the detailed curriculum in `docs/accountant-i-curriculum.pdf` (16 weeks,
agent-coached; see `docs/coach-agent-behavior-spec.md`).

## Modules

- `accountant-i/index.html` — **W0.1 ERP sandbox** (Week 0 · Environment and orientation).
  Single-file, offline-first mobile app: sandbox sign-in, account inquiry, unposted
  journal entry builder, and the report writer (AR aging, fixed asset register,
  project accounting). Deterministic acceptance gate: *learner can log in and run
  one standard report unaided.* Open the file in any browser — no build step.
- `portfolio-lab/` — earlier standalone module (SQL portfolio lab).

## Development

Design and methodology skills are vendored in `.claude/skills/` and apply to all UI
work in this repo — see `CLAUDE.md` and `.claude/skills/README.md` for the roster
and conventions (warm monochrome minimalism, 8-pt grid, thumb-zone actions,
offline-first single-file delivery, deterministic checks before AI).
