async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/main-JGRYIGH2.js");
  const code = await res.text();
  const apiMatches = code.match(/["'\`]\/api\/[^"'\`]+/g) || [];
  console.log("api paths:", [...new Set(apiMatches)].slice(0, 30));

  const orderMatches = code.match(/["'\`][^"'\`]*order[^"'\`]*["'\`]/g) || [];
  console.log("order matches:", [...new Set(orderMatches)].filter(m => m.includes("/")).slice(0, 20));
}
run();
