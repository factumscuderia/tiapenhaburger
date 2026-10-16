async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();
  const firstIdx = code.indexOf("filterCategoriesBySiteData(");
  const secondIdx = code.indexOf("filterCategoriesBySiteData(", firstIdx + 25);
  console.log("Second occurrence:", secondIdx >= 0 ? code.substring(secondIdx - 350, secondIdx + 200) : "Not found in OJ5");

  if (secondIdx < 0) {
    const res2 = await fetch("https://tiapenhaburger.saipos.com/chunk-2IWOI2RG.js");
    const code2 = await res2.text();
    const idx2 = code2.indexOf("filterCategoriesBySiteData(");
    console.log("In 2IW:", idx2 >= 0 ? code2.substring(idx2 - 350, idx2 + 200) : "Not found in 2IW");
  }
}
run();
