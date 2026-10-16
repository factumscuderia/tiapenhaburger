async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();
  const idx = code.indexOf("stores/${r}");
  console.log(code.substring(idx - 250, idx + 250));
}
run();
