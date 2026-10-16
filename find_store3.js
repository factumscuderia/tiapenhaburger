async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();
  const idx = code.indexOf("getInfoStore(");
  console.log("Definition:", code.substring(idx - 100, idx + 200));

  const secondIdx = code.indexOf("getInfoStore(", idx + 20);
  console.log("Usage:", code.substring(secondIdx - 100, secondIdx + 200));
}
run();
