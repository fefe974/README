---
name: application-first-curriculum
description: Design application-first training curricula that turn a job description plus a source textbook into a working training program — with weekly deliverables, end-of-chapter problem assignments mined from the book, a competency rubric, mobile-first delivery, and AI coaching/review agents. Use this skill whenever the user wants to train, onboard, upskill, or certify someone for a specific role; asks how to teach a subject "practically" or "hands-on"; wants to build a learning app, training program, onboarding plan, bootcamp, study plan, or curriculum from a textbook, manual, or standards body of knowledge; wants to convert a book or job posting into lessons and practice; or asks how to design tutoring agents, spaced repetition, or competency assessment for a professional skill. Trigger even when the user only says "build a training plan for this role" or "how would I teach someone to do this job" — and especially when they upload a textbook PDF alongside a job description.
---

# Application-First Curriculum Design

Turn a **job description** plus a **source text** into a program that produces a competent practitioner, not a person who has read a book.

## The core inversion

Traditional instruction runs theory → problems → eventually work. Invert it:

> **Artifact → struggle → just-in-time theory → deliberate reps → verified competence.**

Every unit opens with a real work product the person will be judged on. They attempt it before reading. Reading is assigned *after* the attempt, aimed at the specific confusion the attempt produced. This matters most in domains whose abstractions are inert until you've watched them applied once.

Five rules to hold throughout:

1. Every unit produces a deliverable that would survive a supervisor's review. No unit ends in "read chapter 5."
2. Theory is pulled, not pushed. Readings are short and always attached to an attempt already made.
3. Reps beat coverage. Fifteen reconciliations beats one reconciliation plus three chapters on cash.
4. Assess by artifact, not by quiz. A 0–4 rubric on real output is the only progression gate.
5. Name what the source text gets wrong or omits, and patch it explicitly.

## Workflow

Work through these in order. Ask the user only what you genuinely can't infer — a job posting plus a textbook is usually enough to produce a strong draft without any interview.

### 1. Job-task analysis

Collapse the job description's duty bullets into **6–10 competency domains**. Produce a table: domain → which duty bullets it covers → **the one artifact the person must eventually produce unaided**. Everything downstream hangs off this table, so build it first and show it to the user before going further.

Add two cross-cutting competencies almost every role has: tooling fluency, and judgment/documentation (knowing when to escalate).

### 2. Mine the source text

Do not skim the book and guess. Extract its structure mechanically. See `references/textbook-mining.md` for the exact procedure and working code — it covers pulling the table of contents, learning objectives per chapter, and a complete inventory of end-of-chapter material.

A well-built textbook stratifies its end-of-chapter material into distinct cognitive jobs. Map them:

| Section type | Cognitive job | Where it goes in the loop |
|---|---|---|
| Questions / review questions | Retrieval and articulation | Answered **aloud**, after the first attempt |
| Cases / discussion problems | Judgment under ambiguity | One per week, discussed, never graded right/wrong |
| Exercises and problems | Mechanics and fluency | The rep engine — volume here builds speed |
| Comprehensive/multi-part problems | Integration | The graded milestones |

**Hunt for a transfer thread.** Many texts contain a recurring exercise that returns to the same real-world artifact chapter after chapter (e.g., "Examine the CAFR," "Analyze the annual report," a running case company). Find it, then **substitute the learner's own organization's document**. This is the highest-leverage move available and it costs nothing — it converts an academic exercise set into an expert-sequenced walkthrough of the exact document they'll work on. Look for it early.

### 3. Check the text's currency

Textbooks age. Build a table of what has changed since publication: superseded standards, changed thresholds, renamed concepts, new regulation. Attach a **currency patch** to each affected week rather than a single warning at the front — the patch has to arrive when the stale content does.

State the publication year plainly and don't let the user assume the book is current.

### 4. Sequence into weeks

Weight by **job relevance, not page count**. A chapter central to the daily work gets two weeks; a chapter the role never touches gets cut. Say explicitly which chapters are excluded and why — a curriculum that admits what it drops is more trustworthy than one that covers everything shallowly.

Each week gets: learning objectives, cold-attempt items, reading, Questions (by number), Exercises (by number), one Case, the transfer task against the real organization's documents, the currency patch, and a check condition.

Mark graded milestones with ★. Identify any content the book scatters across chapters that the job treats as one duty (grant compliance, safety, customer escalation) and **add a consolidation week** that reassembles it.

Then write a "if time is shorter" section listing what to cut, in order, and what must never be cut.

### 5. Assessment

Use the 0–4 rubric in `references/rubric-and-gates.md`. Score by artifact at phase boundaries. Gates are hard: do not advance on a Level 1 in that phase's core competency.

### 6. Delivery design (only if it's being built as an app)

Read `references/mobile-delivery.md`. The essential move is an honest triage — some content is phone-native, some is phone-mediated, and some must stay off-phone. Never "mobilize" a task whose value lies in sustained concentration.

### 7. Agent design (only if humans are being replaced)

Read `references/agent-roster.md` for the six-agent structure, and `references/coach-agent-spec.md` for a complete implementation-ready spec of the tutor agent — state machine, hint ladder, error classification, prompt skeleton, test cases. Adapt the domain specifics; keep the architecture.

Three non-negotiables carry across every domain:
- **Deterministic first.** Never use a language model where a rule check is correct, cheaper, and auditable.
- **Facts in a versioned table, not in prompts or model weights.** Any number a learner would act on lives in one dated file that agents read from.
- **The helper cannot grade its own help.** Isolate the coach's context from the reviewer's and the manager's, or scores inflate.

## Output format

Produce a markdown file, not a chat response — this is a document people will work from for months. Structure:

```
# [Role] Training Curriculum
## 1. Design logic (the inversion, the five rules, the effort model)
## 2. Job-task analysis → competency map
## 3. Environment setup (week 0)
## 4. Source text currency check
## 5. The N-week schedule
## 6. Assessment rubric and gates
## 7. Sustainment, certification, continuing education
## 8. Known failure modes
## 9. Source list
## 10. One-page condensed schedule
```

Cite specific exercise numbers throughout. A curriculum that says "work the end-of-chapter problems" is worthless; one that says "★4‑27, then 9‑20 and 9‑27 cold at week 16" is usable Monday morning.

## Research to run

Search for these before writing — they change the curriculum's substance and they date fast:

- **Current standards and effective dates** in the field. The textbook is almost certainly behind.
- **Regulatory or threshold changes** since publication.
- **Certification paths** — exam structure, cost, study hours, reciprocity. Recommend one and sequence it.
- **Continuing education circuits** — the associations, conferences, and institutes practitioners in this specific role actually attend, including regional ones.
- **Jurisdiction-specific law** where the role is government or regulated. Job postings leak this (a posting mentioning "Commissioner's Court" is a Texas county; "borough president" is New York City).

## Failure modes to design against

Include a section naming these in the output, adapted to the domain:

1. **Template dependence** — can fill the form, can't build one for a new case. *Counter:* one task per phase with no template.
2. **Learning the employer instead of the discipline** — masters local procedure, can't reason about a novel situation. *Counter:* keep the text and standards readings non-negotiable; make the capstone use unseen material.
3. **Compliance as vibes** — "knows" something is prohibited but can't cite the rule. *Counter:* a cite-the-section drill, repeated.
4. **Escalation failure in both directions** — silent fixes of things that needed telling; escalation of things they should have handled. *Counter:* an explicit scored exercise where the learner chooses fix-silently / fix-and-notify / stop-and-escalate.
5. **Stale standards** — learning from an aged text uncorrected. *Counter:* the currency patches, plus a standing monthly "what changed" review.
6. **No writing practice** — most professional roles are 40% written explanation. *Counter:* every deliverable requires a memo.

## Reference files

- `references/textbook-mining.md` — extracting TOC, learning objectives, and a full end-of-chapter inventory from a PDF, with working code
- `references/rubric-and-gates.md` — the 0–4 competency rubric, gate procedure, coaching cadence
- `references/mobile-delivery.md` — content triage, session formats, interaction primitives, spacing engine
- `references/agent-roster.md` — the six agents, deterministic-first architecture, anti-sycophancy, evaluation
- `references/coach-agent-spec.md` — complete tutor agent spec: state machine, hint ladder, error classification, prompts, test cases
