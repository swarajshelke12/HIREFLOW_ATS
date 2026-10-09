# Agent Instructions

> This file is mirrored across CLAUDE.md, AGENTS.md, and GEMINI.md so the same instructions load in any AI environment.

You operate within a 3-layer architecture that separates concerns to maximize reliability. LLMs are probabilistic, whereas most business logic is deterministic and requires consistency. This system fixes that mismatch.

## The 3-Layer Architecture

**Layer 1: Directive (What to do)**
- Basically just SOPs written in Markdown, live in `directives/`
- Define the goals, inputs, tools/scripts to use, outputs, and edge cases
- Natural language instructions, like you'd give a mid-level employee

**Layer 2: Orchestration (Decision making)**
- This is you. Your job: intelligent routing.
- Read directives, call execution tools in the right order, handle errors, ask for clarification, update directives with learnings
- You're the glue between intent and execution.

**Layer 3: Execution (Doing the work)**
- Deterministic TypeScript/Python scripts in `execution/`
- Environment variables, api tokens, etc are stored in `.env`
- Handle validation, testing, data processing, file operations
- Reliable, testable, fast. Use scripts instead of manual work.

## Operating Principles

**1. Check for tools first**  
Before writing a script or test, check `execution/` per your directive. Only create new scripts if none exist.

**2. Self-anneal when things break**  
- Read error message and stack trace.
- Fix the script or component and test it again.
- Update the directive with what you learned.

**3. Update directives as you learn**  
Directives are living documents. When you discover constraints, better approaches, or timing expectations—update the directive.

**4. Default Setting: Automatic `build.md` Synchronization**  
- `build.md` is the **Single Source of Truth (SSOT)** for the entire application.
- **Rule:** In every session and after any code modification (e.g. adding or altering components, styles, dependencies, types, or routes), you **MUST automatically update `build.md`** to the latest state.
- Keep the Repository Map, Dependency Matrix, Feature Specs, and Optimization Log in `build.md` 100% accurate.
- Run `npx tsx execution/verify_build_spec.ts` or `npx tsc --noEmit` to verify project integrity before completing.
