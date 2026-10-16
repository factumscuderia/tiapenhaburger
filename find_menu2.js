async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-2IWOI2RG.js");
  const code = await res.text();
  console.log("chunk-2 length:", code.length);

  const endpoints = [...code.matchAll(/["'\`][a-zA-Z0-9_\-\/]*menu[a-zA-Z0-9_\-\/]*["'\`]/gi)].map(m => m[0]);
  console.log("menu matches in chunk-2:", [...new Set(endpoints)].slice(0, 30));

  const items = [...code.matchAll(/["'\`][a-zA-Z0-9_\-\/]*categories[a-zA-Z0-9_\-\/]*["'\`]/gi)].map(m => m[0]);
  console.log("categories matches:", [...new Set(items)].slice(0, 30));
}
run();
