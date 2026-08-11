# Mobile-First Delivery

## Start with an honest triage

Professional curricula are not uniformly phone-friendly. Design around the split instead of pretending it away.

| Tier | Content | Phone role |
|---|---|---|
| **A — Phone-native** | Recall questions, multiple choice, classification and sorting, matching, single-step procedures, short scenarios, document-inspection prompts | Full delivery |
| **B — Phone-mediated** | Multi-part exercises | Prompt, decompose into 3–6 steps, time, capture by photo, submit |
| **C — Off-phone, phone-scheduled** | Comprehensive integrative problems, spreadsheet work, real workplace deliverables | Scheduling, brief, checklist, timer, submission, review |

**The rule that matters:** a Tier C task whose value lies in holding a whole problem in your head for ninety minutes is destroyed by "mobilizing" it into a tiny grid. Preserve it off-phone. The app's job there is to make sure it happens on schedule and gets reviewed.

Expect roughly a third of a professional curriculum in each tier. On-phone time typically lands around 60–90 minutes a week out of a 6–8 hour program — the phone absorbs recall and classification load, freeing desk hours for desk work.

## Five session formats, nothing else

| Format | Length | Frequency | Contains |
|---|---|---|---|
| **Drill** | 3–5 min | Daily, 2× | 10–14 spaced items, mixed topics |
| **Lesson** | 7–10 min | 3–4× / week | One objective. Concept screen, worked example, three checks. Max 7 screens. |
| **Practice** | 12–20 min | 3× / week | One Tier A or B exercise, decomposed |
| **Case** | 8–12 min | 1× / week | Scenario, position choice, then expert and peer positions revealed |
| **Milestone** | 60–120 min, off-phone | 1× / week | Tier C, with brief, timer, submission, async review |

**Enforce chunking in the component library**, not in authoring guidelines: no screen scrolling past ~1.5 viewports; no structured-entry item beyond 4 lines; no horizontal-scroll tables (stack them as cards); primary actions in the bottom thumb zone; 48×48 dp minimum targets; numeric keypad with a format mask for any quantity field.

## Interaction primitives

Build the primitives; content then becomes authoring rather than engineering. Adapt names to the domain, but these six generalize:

1. **Dual-view toggle** — one stimulus, two tabs, an answer required on each *including an explicit "none, and here's why."* Use wherever a domain requires holding two simultaneous frames (two accounting bases, clinical vs. billing coding, legal vs. practical risk). Usually the signature mechanic.
2. **Structured builder** — a picker seeded from the organization's real taxonomy (chart of accounts, code set, part catalog), never free text. Passively teaches the taxonomy.
3. **Router** — tap or swipe an item into the correct category. Sub-five-second items, ideal for Drill.
4. **Bucket sorter** — two or three buckets. The most valuable variant is nearly always **allowed / not allowed / need more information**, because the third bucket is where professional judgment lives.
5. **Document annotator** — renders a page of the learner's *own organization's* real document; the learner taps the region answering a prompt. If the source text has a transfer thread, this makes it native. Highest-leverage component in most builds.
6. **Voice explain** — 60–90 seconds answering aloud, transcribed, compared against a model answer, optionally routed for review. Preserves "answer aloud, not in writing" without a live human, and rehearses the explaining that most professional roles actually require.

Plus **capture and markup** (photograph handwritten or desktop work; reviewer annotates in-app) as the bridge for Tiers B and C.

## Spacing engine

Use FSRS over SM-2 or Leitner. FSRS models stability, difficulty, and retrievability and schedules at the point recall probability approaches a target retention (~90%), scheduling meaningfully fewer reviews than SM-2 for the same retention — which matters when the learner is a working adult with an hour a week. Mature open-source implementations exist. That said, the gap between any spacing algorithm and no spacing dwarfs the gap between algorithms, so this is an optimization, not a launch blocker.

**In the spaced pool:** definitions and distinctions, rules and criteria, thresholds and numbers, classification reflexes, two-frame pairs.

**Not in the pool:** comprehensive integrative problems. Procedural fluency doesn't respond to flashcard scheduling. Interleave fixed re-attempts of the milestones instead, under progressively less scaffolding.

**Let the error journal drive the pool.** A Category-2 error should automatically inject extra reps of that exact distinction into the next day's Drill. That single rule does more for outcomes than most features.

## Progress and motivation

Streaks, points, and leaderboards are wrong for credentialed professionals whose employer is paying. They produce streak-preserving behavior instead of learning, and they read as condescending.

Use instead: **competency rings** filling toward rubric levels, **mastery gates** that don't unlock on time served, a **visible error profile** charted over weeks, and a **portfolio export** that doubles as review evidence and certification support.

**Notifications: two per day maximum.** One drill nudge, one milestone reminder.

## Offline-first

Field roles, travel, and bad buildings make this non-negotiable. Cache the next seven days of Drill, Lesson, and Practice content plus the documents for the current week's inspection exercise. Queue submissions and recordings for sync. Never block a session on a network call.

## Two blockers to resolve before building

**Copyright.** End-of-chapter items in a commercial textbook cannot be reproduced in an app without a license. Three paths: license the item bank; build the app as a *scheduler and practice layer* that assigns work done in the book, storing only item numbers, objectives, and the learner's own responses; or author original items against the same objectives, using the book as design blueprint. The middle path ships fastest and legally, migrating to the third as content is written.

**Organizational data.** Public documents are safe. Internal taxonomies, live operational data, and anything with personal or financial detail are not. Decide early whether the app runs on the organization's own infrastructure, and default v1 to public documents plus a synthetic taxonomy modeled on the real structure.

## Build order

**MVP:** grounding layer, deterministic grader, the two or three primitives your domain leans on hardest, capture-and-review, offline cache.

**Later:** document annotator, voice, spacing upgrade, competency rings, analytics.

**Don't build:** an in-app spreadsheet, an in-app full-document editor, a tutor that answers before the learner commits, or any path that lets a learner self-certify a milestone.
