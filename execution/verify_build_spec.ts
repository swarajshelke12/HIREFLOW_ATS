/**
 * Deterministic Test Script: Verify build.md Integrity Against Active Codebase
 * Layer 3 Execution Tool
 */

import * as fs from "fs";
import * as path from "path";

const ROOT_DIR = path.resolve(__dirname, "..");
const BUILD_MD_PATH = path.join(ROOT_DIR, "build.md");

const CRITICAL_FILES = [
  "app/layout.tsx",
  "app/globals.css",
  "app/page.tsx",
  "components/ui/card.tsx",
  "components/ui/spline.tsx",
  "components/ui/spotlight.tsx",
  "components/ui/glassmorphism-cta.tsx",
  "components/ui/glassmorphism-button.tsx",
  "lib/types.ts",
  "lib/utils.ts",
  "directives/candidate_intake.md",
  "directives/n8n_webhook_integration.md",
  "directives/spline_3d_assets.md",
  "directives/maintain_build_spec.md",
  "execution/validate_inputs.ts",
  "execution/verify_build_spec.ts",
  "package.json",
  "tsconfig.json",
];

function verifyBuildSpec() {
  console.log("Verifying build.md state and project files...");

  if (!fs.existsSync(BUILD_MD_PATH)) {
    console.error("FAIL: build.md does not exist!");
    process.exit(1);
  }

  const buildContent = fs.readFileSync(BUILD_MD_PATH, "utf-8");

  let missingFiles = 0;
  for (const relativePath of CRITICAL_FILES) {
    const fullPath = path.join(ROOT_DIR, relativePath);
    if (!fs.existsSync(fullPath)) {
      console.warn(`WARNING: File missing on disk: ${relativePath}`);
      missingFiles++;
    } else if (!buildContent.includes(path.basename(relativePath))) {
      console.warn(`WARNING: File ${relativePath} not documented in build.md`);
      missingFiles++;
    }
  }

  if (missingFiles === 0) {
    console.log("SUCCESS: All critical files are present on disk and documented in build.md!");
  } else {
    console.log(`Completed with ${missingFiles} warnings.`);
  }
}

verifyBuildSpec();
