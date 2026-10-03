---
name: app-troubleshoot
description: Find the exact cause of a problem in an existing application and fix it fast and safely, and make design/UI/behavior changes inside an app. Use for any app that crashes, freezes, exits silently, shows a blank or broken window, has buttons that do nothing, behaves differently after install or restart, throws an error, or needs a design change, a new feature, or a fix to something that "stopped working". Use it before proposing any fix, and use it for every UI change in an app.
---

# App troubleshooting and in-app changes

Goal: locate the problem precisely, fix only that, prove it works. Speed comes from not guessing.

## 0. Before anything
- Read `PROJECT_STATE.md`. Note the stack, how the app is run, and what already failed.
- Make sure there is a git commit or backup. If not, create one first.
- Run `date` if time or versions matter.

## 1. Pin down the symptom (one sentence, from evidence)
Write: what the user did -> what happened -> what was expected. Use the exact error text, not a paraphrase.
Classify it, because each class has a different first check:
| Symptom | First check |
|---|---|
| Crash with traceback | Read the traceback bottom-up. The last line in OUR code is the suspect. |
| Exits silently (exit code 0) | The app chose to exit. Look for single-instance checks, lock files, sockets, early `return`/`sys.exit`. |
| Freeze / hang | Where is it waiting? Use `python -X faulthandler` and send SIGABRT, or a thread dump, or `strace -p`. |
| Blank / broken / wrong-size window | Layout, parent/child relations, window flags, stylesheet errors, fixed sizes. |
| Button does nothing | Is the signal connected? Is the slot raising an exception that is swallowed? Print or log inside the handler. |
| Works manually, fails as service or after install | Installed copy differs from source, different working dir, environment variables, permissions, user. |
| Worked yesterday, broken today | `git diff`, `git log`, then `git bisect`. |

## 2. Get ground truth (fast checklist)
Run the app from a terminal so stderr is visible. Then, as relevant:
- Logs: terminal output, `journalctl -u <service> -n 50 --no-pager`, `journalctl --user -u <service>`, app log files.
- Which copy is running? Compare installed vs project: `diff -rq --exclude=__pycache__ <project> <installed>`. Then `diff -u` on the differing files.
- What is running right now? `pgrep -af <name>`, `ps aux | grep -i <name>`, `ss -xlp | grep <name>` (unix sockets), `ss -tlnp` (ports).
- Lock files and sockets left behind: check `$XDG_RUNTIME_DIR`, `/tmp`, the app's config dir.
- Syntax and imports: `python3 -m py_compile file.py`, then `python3 -c "import package.module"`.
- Versions: language, framework, OS, driver. Check the real ones, do not assume.
- Stylesheet/config warnings: read every warning line printed at startup, not only errors.

## 3. Narrow down (bisect, do not wander)
1. List 2-3 hypotheses ranked by likelihood.
2. For each, name the ONE check that proves or kills it. Run the cheapest first.
3. Cut the search space in half each step: git bisect, disable half the features, comment out half the init code, test with a minimal reproduction.
4. Stop when you can say: "The problem is X, in file Y, line Z, because W" and you have evidence (a log line, a diff, a test).

## 4. Fix
- Smallest change, one file, one purpose. No refactoring on the side.
- Show before/after for the changed lines only.
- If the cause is a mismatch between files (for example `app.py`, `tray.py`, `widgets.py` expect each other), change or restore them together.
- Do not delete user data, logs, backups, or running processes without saying so first and keeping a copy.
- State the risk of the fix in one line and how to undo it.

## 5. Prove it
- Run the exact scenario from step 1 and show the real output.
- Re-test the neighbors: other buttons, other pages, startup, shutdown, restart, the installed copy.
- If tests exist, run them. If not, add the smallest test or manual checklist that would have caught this.
- Only then write "fixed". Update `PROJECT_STATE.md`: cause, fix, what was tried, what not to do.

## 6. Design, UI and behavior changes inside an app
1. Read the existing code and styling first. Keep the existing design language, naming and structure.
2. Agree the change in 2-3 lines: what, where, how it should look and behave in each state (normal, hover, pressed, disabled, empty, error).
3. Implement in the smallest steps. Run after each step.
4. Check: small and large window sizes, high-DPI scaling, dark/light theme, long text and translations, RTL if the app uses Arabic, keyboard use, and that nothing else moved.
5. Show before/after and exactly what to look at to confirm.
6. For GUI apps, keep the UI responsive: slow work (hardware, network, subprocess, audio) must not run on the UI thread.

## 7. Patterns that caused real bugs (check these early)
- **Child widget with window flags:** a widget that has window-type flags (Tool, Window, Popup, frameless top-level) becomes its own top-level window even if it has a parent. It leaves the parent's layout. Put window flags only on the real top-level container.
- **Fixed sizes:** a fixed height clips content that grows. Prefer a fixed width plus a layout that sizes the height, or a layout size constraint on the container.
- **Plain string vs f-string:** `{{` and `}}` mean literal braces only inside f-strings. In a normal string they stay doubled and break CSS/Qt stylesheets silently (look for "could not parse stylesheet" in stderr).
- **Single-instance apps:** a second launch may hand over to the first and exit with code 0 and no message. Before assuming a crash, check for a running instance or socket. A stale socket file without a live process does not block a new start, a live process does.
- **Code reading attributes that live elsewhere:** `AttributeError: 'X' has no attribute 'Y'` often means the attribute lives on another object or module (for example a constant on a module, or on an `engine` member). Find where it is really defined with grep before editing.
- **Installed copy vs source:** edits in the project folder do nothing for a service that runs from another path. Compare, back up, copy, restart, verify the running copy.
- **Background processes left behind:** presets, filters or helpers started by the app can outlive it and pile up when started repeatedly. Check for leftovers (`pgrep -af`) and make sure start() stops the previous one.
- **Swallowed exceptions:** `try/except: pass` hides the real error. Temporarily log the exception to find it.
- **Wayland/X11 differences:** window positioning, always-on-top and activation can behave differently. Check the session type (`echo $XDG_SESSION_TYPE`).

## 8. Response format
1. **Problem** (one sentence) and **Evidence**.
2. **Cause** (file, line, why).
3. **Fix** (before/after).
4. **How to test** (exact commands and expected result).
5. **Undo** (one line).
If you cannot reach step 2 yet, ask for the single most useful file or output, and say why.
