async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();
  const idx = code.indexOf("this.getCategories(");
  console.log(code.substring(idx - 300, idx + 200));
}
run();
