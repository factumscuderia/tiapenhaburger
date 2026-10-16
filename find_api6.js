async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();
  const idx = code.indexOf("delivery-api.saipos.com/v1");
  console.log(code.substring(idx - 100, idx + 400));
}
run();
