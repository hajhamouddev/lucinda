---
name: project-memory
description: Keep the project's state in PROJECT_STATE.md so nothing is forgotten in long sessions. Use at the start of every session, after every milestone, decision, failed attempt or change of plan, when the conversation gets long, when the user says you forgot or drifted, and before ending the session.
---

# Project memory

`PROJECT_STATE.md` in the project root is the single source of truth. Chat history is not.

## Start of session
1. Read `PROJECT_STATE.md`. Summarize in 3 lines: goal, current status, next step.
2. If the file is empty or outdated, ask ONE question to fill the gap, then write it.

## During the session
Update the file immediately (not at the end) when:
- something works or is finished -> add to **Done**
- a decision is made -> add to **Decisions** with the reason
- something fails -> add to **Known problems / what failed** with what was tried
- the user rejects an approach -> add to **Do NOT do**
- the plan changes -> rewrite **Next step**

## Rules
- Write only facts the user stated or things verified by command output. No guesses.
- Keep it short. Merge duplicates and delete stale lines. Target under 150 lines.
- Every ~20 messages, re-read the file before answering.
- Before ending, make sure **Current status** and **Next step** are accurate.
