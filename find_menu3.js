async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-2IWOI2RG.js");
  const code = await res.text();
  const idx = code.indexOf("categoriesList");
  console.log(code.substring(idx - 150, idx + 350));
}
run();
