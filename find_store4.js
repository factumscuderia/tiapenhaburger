async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();
  const idx = code.indexOf("getEncodedParams(");
  console.log(code.substring(idx - 50, idx + 350));
}
run();
