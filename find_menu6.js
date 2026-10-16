async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();

  // search for menuService
  const matches = [...code.matchAll(/class [a-zA-Z0-9_]+\s*\{\s*constructor\([^)]*\)\s*\{[^}]*menuService[^}]*\}/g)].map(m => m[0]);
  console.log("menuService classes:", matches.slice(0, 5));

  // search for "menu" in api calls
  const allEndpoints = [...code.matchAll(/getEncodedParams\(([^)]+)\)/g)].map(m => m[1]);
  console.log("Endpoints:", allEndpoints);
}
run();
