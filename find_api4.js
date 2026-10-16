async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/main-JGRYIGH2.js");
  const code = await res.text();
  // search for environment or baseUrl
  const matches = code.match(/[a-zA-Z0-9_]*url[a-zA-Z0-9_]*\s*[:=]\s*["'\`][^"'\`]+["'\`]/gi) || [];
  console.log("URL configs:", matches.slice(0, 30));

  // search for .get( or .post(
  const gets = code.match(/\.get\(\s*["'\`][^"'\`]+["'\`]/g) || [];
  console.log("Gets:", gets.slice(0, 30));

  const templates = code.match(/\.get\(\s*\`[^\`]+\`/g) || [];
  console.log("Template gets:", templates.slice(0, 30));
}
run();
