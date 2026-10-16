async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-2IWOI2RG.js");
  const code = await res.text();
  const idx = code.indexOf("class l{constructor(n,s,a,u,g,b)");
  console.log(code.substring(idx, idx + 800));
}
run();
