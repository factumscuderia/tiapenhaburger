async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();
  const idx = code.indexOf("##");
  console.log("Index of ## in OJ5:", idx >= 0 ? code.substring(idx - 100, idx + 400) : "Not found in OJ5");

  if (idx < 0) {
    const res2 = await fetch("https://tiapenhaburger.saipos.com/chunk-2IWOI2RG.js");
    const code2 = await res2.text();
    const idx2 = code2.indexOf("##");
    console.log("Index of ## in 2IW:", idx2 >= 0 ? code2.substring(idx2 - 100, idx2 + 400) : "Not found in 2IW");
  }
}
run();
