async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-2IWOI2RG.js");
  const code = await res.text();
  const idx = code.indexOf(".getMenuData(");
  console.log(code.substring(idx - 300, idx + 100));
}
run();
