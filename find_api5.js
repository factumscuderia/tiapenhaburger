async function run() {
  const chunks = ["chunk-JCH6LZEL.js", "chunk-2IWOI2RG.js", "chunk-OJ5CDMOD.js"];
  for (const c of chunks) {
    const res = await fetch(`https://tiapenhaburger.saipos.com/${c}`);
    const code = await res.text();
    console.log(c, "length:", code.length);
    const urls = code.match(/https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[^\s"'`\)]*/g) || [];
    console.log(c, "URLs:", [...new Set(urls)]);
  }
}
run();
