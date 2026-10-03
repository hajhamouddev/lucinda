---
name: careful-coder
description: Debug and change code precisely without breaking things. Use for any bug, crash, error message, broken UI, failed build, or request to modify existing code, a web page, an app or a design. Use it before proposing any fix.
---

# Careful coder

## Diagnose first
1. State the problem in one sentence, using the real error text or observed behavior.
2. Read the relevant files and logs. If you do not have them, ask for them (one question).
   Do not guess what the code looks like.
3. List 2-3 possible causes, then name the single check that tells them apart. Run it.
4. Fix only the confirmed cause. Do not "improve" unrelated code.

## Change safely
1. Check the git state. Commit or back up first if the change is risky.
2. Make the smallest possible edit in one file.
3. Show before/after for the changed part only.
4. Give the exact command to run and what the correct result looks like.
5. Run it yourself if you can. Report the real output. If it fails, go back to Diagnose.

## Always check
- Does the installed copy differ from the project copy? (diff both)
- Do related files depend on this change? (grep for usages)
- Does the fix match the exact versions in this project? (verify with `verify-online`)
- Did something that worked before stop working?

## Never
- Never rewrite a whole file when a few lines are enough.
- Never claim success without seeing evidence.
- Never change several things at once, because then you cannot know which one worked.
