# SOP: Continuous Synchronization & Maintenance of `build.md`

## 1. Objective
Ensure that `build.md` remains the authentic, up-to-date Single Source of Truth (SSOT) representing the exact state of the HireFlow project at all times.

## 2. Mandatory Trigger Events
Whenever any agent or developer:
1. Adds, renames, or deletes files or directories in `app/`, `components/`, `lib/`, `directives/`, or `execution/`.
2. Installs, upgrades, or removes packages in `package.json`.
3. Alters styles, design tokens, or keyframe animations in `globals.css` or Tailwind configuration.
4. Changes data contracts, validation rules, or webhook payloads in `lib/types.ts` or `app/page.tsx`.
5. Fixes, refactors, or optimizes code logic.

## 3. Required Updates to `build.md`
- **File Map / Repository Map:** Ensure all files are catalogued with their actual purpose.
- **Dependency Table:** Reflect exact installed package names and functions.
- **Feature & Design System Specs:** Document new UI effects, components, or motion systems.
- **Optimization Log:** Note engineering enhancements or changes made.
- **Timestamp & Version:** Update the header subtitle to reflect the latest state.

## 4. Verification
Before completing any task, run:
```bash
npx tsx execution/verify_build_spec.ts
```
Or execute type verification:
```bash
npx tsc --noEmit
```
Both must pass cleanly.
