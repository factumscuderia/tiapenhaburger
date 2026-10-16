async function run() {
  const sUrl = "https://tiapenhaburger.saipos.com/main-JGRYIGH2.js";
  const res = await fetch(sUrl);
  const code = await res.text();
  console.log("main length:", code.length);

  // find any url with saipos or api
  const matches = code.match(/https:\/\/[^"'\`\s\)]+/g) || [];
  const unique = [...new Set(matches)];
  console.log("All URLs:", unique.filter(u => u.includes("saipos")));
}
run();
