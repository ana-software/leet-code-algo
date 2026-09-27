// Runs problem tests: `npm test` runs all, `npm test 167` runs one, `npm test 1 167 42` runs several
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..", "problems");
const problems = readdirSync(root, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^\d+\. /.test(d.name) && existsSync(join(root, d.name, "solution.test.ts")))
  .map((d) => d.name)
  .sort((a, b) => parseInt(a) - parseInt(b));

const wanted = process.argv.slice(2);
const selected = wanted.length ? problems.filter((p) => wanted.includes(String(parseInt(p)))) : problems;

const missing = wanted.filter((n) => !problems.some((p) => String(parseInt(p)) === n));
if (missing.length) console.error(`⚠️  No problem folder for: ${missing.join(", ")}\n`);
if (!selected.length) process.exit(1);

const failed: string[] = [];
for (const problem of selected) {
  console.log(`━━━ ${problem} ━━━\n`);
  const { status } = spawnSync(process.execPath, ["--import", "tsx", join(root, problem, "solution.test.ts")], {
    stdio: "inherit",
  });
  if (status !== 0) failed.push(problem);
  console.log();
}

if (selected.length > 1) {
  console.log(failed.length ? `❌ ${failed.length}/${selected.length} problems failing: ${failed.join(", ")}`
                            : `✅ All ${selected.length} problems accepted`);
}
process.exit(failed.length ? 1 : 0);
