async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();

  // Find endpoints with id_store
  const matches = [...code.matchAll(/getEncodedParams\(\s*["'\`][^"'\`]+["'\`]/g)].map(m => m[0]);
  console.log("getEncodedParams calls:", [...new Set(matches)]);
}
run();
