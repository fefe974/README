# Agent Roster

Replacing human coaches, peer reviewers, and managers with in-app agents. Start by naming the load: list every job the humans were doing and its weekly hours. Most are automatable to a high standard; be specific about which aren't.

## Six agents, deliberately separated

The separation is not decoration. It prevents the most predictable failure of AI tutoring: the helper grading its own help.

### Coach — synchronous, in-session
The tutor. Never volunteers an answer, gates on a committed attempt, escalates hints one rung at a time, classifies errors, and cannot see milestone answer keys. Full implementation spec in `coach-agent-spec.md`.

### Reviewer — asynchronous artifact grading
Grades submissions including photographed handwritten work and uploaded files, via vision. Produces a structured diff against the expected result, then writes **at most three substantive comments** — which is exactly how the rubric defines a Level 3 artifact, so the comment count *is* the score signal. Flags what it couldn't verify rather than guessing; an illegible photo returns "resubmit," not a fabricated assessment. Does not see the coaching transcript: it grades the artifact, not the effort.

### Manager — weekly and at gates
Scores competencies on the 0–4 rubric with each score citing specific artifacts. Adjusts the plan: inject reps, repeat a phase, unlock, or hold. Plays the supervisor in the escalation exercise — including responding *badly* to a bad call, since a manager mildly annoyed at an unnecessary escalation teaches more than one who praises everything. Plays the examiner in the capstone defense.

### Counterparty — roleplay
The stakeholders the role actually deals with, each with a difficulty dial. In most professional roles this is the single largest improvement agents make to the curriculum, because written response exercises were always a weak substitute for a duty that is fundamentally conversational. Score on accuracy, traceability to a source, plain-language clarity, and whether the learner correctly routes what isn't theirs to answer.

### Author — item generation
Generates original practice items targeting a specific objective and error pattern. Two payoffs: unlimited variant reps for whatever the learner keeps missing, and a **route around textbook copyright** — original items against the same objectives. Every generated item passes the Verifier first.

### Verifier — retrieval and check
Not learner-facing. Every technical assertion any agent makes is grounded against a retrieval corpus before it ships: standards bodies, regulations, and the organization's own uploaded documents.

**Hard rule: no agent answers a technical question from parametric memory.** In a regulated domain, that's how a training app gets someone fired.

## Deterministic first, model second

The decision most often gotten wrong. **Never use a language model where a rule engine is correct, cheaper, and auditable.**

| Item type | Graded by | Model's role |
|---|---|---|
| Structured entry (builder items) | Rule check against stored key | Explain the diff |
| Routing, sorting, matching, multiple choice | Deterministic | Explain the distractor |
| Two-frame toggle | Deterministic on both frames, including "no entry" | Explain *why* none — the valuable part |
| Voice explanation | Model, rubric-scored against a model answer | Full |
| Judgment cases | Model, **never scored right/wrong** — scored on whether the reasoning engaged the real tension | Full |
| Uploaded artifacts | Vision extraction → deterministic where structured → model for the rest | Mixed |
| Comprehensive milestones | Model against a detailed key, per-line | Full, with human ratification |

**All numbers live in a versioned facts table**, not in prompts and not in the model: thresholds, effective dates, rates, and the organization's own policy values. One dated file, reviewed on a schedule. When it changes, every item and explanation referencing it flags for regeneration. This is the difference between a training app that ages gracefully and one that starts teaching a superseded threshold two years from now.

## Anti-sycophancy

- **Context isolation.** Reviewer and Manager can't read Coach transcripts; Coach can't read milestone keys.
- **Comment count as score**, checked against a deterministic diff — hard to fake generously.
- **Calibration monitoring.** Mean rubric score drifting up without matching deterministic accuracy is inflation. Retune.
- **Adversarial second pass** on milestones, prompted specifically to find what's wrong. Both passes feed the score.
- **The Manager must be able to say no.** Gate recommendations include a real hold option, exercised about as often as a competent human would. If nobody ever repeats a phase, the gate isn't a gate.

## Escalation

Agents will hit three question types they shouldn't answer: organization-specific policy not in the corpus; judgment with employment or legal consequence; and anything the Verifier can't ground.

**Escalation rate is a health metric, not a failure.** A rising rate in one topic usually means a missing document — a five-minute upload rather than a hire. Route escalations to a queue that real staff clear in batch; target well under an hour a week against the many hours the human roles cost.

## Evaluation before shipping

- **Golden set.** Have a practicing expert grade ~100 real submissions across every competency. Measure agent–expert agreement **by competency, not in aggregate** — the agent will be far better at structured items than at judgment, and the aggregate hides that.
- **Hallucination audit.** Sample every technical assertion in a week's output and verify against source. Any ungrounded claim is a P0.
- **Facts-table regression.** Change a threshold in config; confirm every downstream explanation updates.
- **Longitudinal outcome check.** Do agent-trained learners pass the capstone at the same rate as human-trained ones? The only question that finally matters, and it takes a cohort to answer.

## The residue

Most of the human load goes to agents. Some doesn't, and the design is better for admitting it.

A human should sign phase gates and final certification — not because the agent assesses worse, but because advancing someone through role-linked training is an employment decision needing an accountable name; because readiness includes things the app can't observe; and because real work assignment requires someone with authority to grant access.

Make it cheap: the Manager produces a complete gate packet and a human spends thirty minutes signing it, a few times per program. Where no mentor exists, run autonomously and mark unsigned gates **unratified** rather than equivalent.
