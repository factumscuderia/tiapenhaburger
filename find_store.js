async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();

  // Find store service
  const matches = code.match(/["'\`][a-zA-Z0-9_\-\/]+["'\`]\s*,\s*\{\s*params/g) || [];
  console.log("params matches:", matches.slice(0, 30));

  // Find where stores is queried
  const storeMatches = [...code.matchAll(/stores\/[a-zA-Z0-9_\-\$\{\}]+/g)].map(m => m[0]);
  console.log("stores matches:", [...new Set(storeMatches)]);

  const getCalls = [...code.matchAll(/this\.http\.get[<a-zA-Z0-9_>]*\([^)]+\)/g)].map(m => m[0]);
  console.log("http.get calls:", getCalls.slice(0, 20));
}
run();
