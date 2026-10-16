async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();

  // find all occurrences of lr.apiUrl or apiUrl
  const matches = [...code.matchAll(/lr\.apiUrl\s*\+\s*["'\`][^"'\`]+["'\`]/g)].map(m => m[0]);
  console.log("apiUrl matches:", [...new Set(matches)]);

  const templates = [...code.matchAll(/`\${[a-zA-Z0-9_\.]*apiUrl}[^`]+`/g)].map(m => m[0]);
  console.log("Template matches:", [...new Set(templates)]);
}
run();
