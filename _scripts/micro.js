import fs from "node:fs";

if (process.argv.length > 3) {
  console.error("\u001B[31mToo many arguments provided. Did you mean to quote the post content?\u001B[0m");
  process.exit(1);
}

const input = process.argv.slice(2)[0];

const date = new Date();
const directory = [
  "micro",
  date.getFullYear(),
  (date.getMonth() + 1).toString().padStart(2, "0"),
  date.getDate().toString().padStart(2, "0"),
].join("/");

let fileId = 0;
while (fs.existsSync(`${directory}/${fileId.toString().padStart(3, "0")}.md`)) {
  fileId++;
}

fs.mkdirSync(directory, { recursive: true });
fs.writeFileSync(
  `${directory}/${fileId.toString().padStart(3, "0")}.md`,
  `---
date: ${date.toISOString()}
---

${input.replace(/\\n/g, "\n")}
`,
);
