async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/chunk-OJ5CDMOD.js");
  const code = await res.text();

  // Saipos uses subdomain as store identifier (e.g. "tiapenhaburger")
  // Let's test calling https://delivery-api.saipos.com/v1/store/tiapenhaburger
  const endpoints = [
    "https://delivery-api.saipos.com/v1/store/tiapenhaburger",
    "https://delivery-api.saipos.com/v1/store?subdomain=tiapenhaburger",
    "https://delivery-api.saipos.com/v1/store/subdomain/tiapenhaburger",
    "https://delivery-api.saipos.com/v1/stores/tiapenhaburger",
    "https://delivery-api.saipos.com/v1/menu/tiapenhaburger",
    "https://delivery-api.saipos.com/v1/menu?subdomain=tiapenhaburger"
  ];

  for (const ep of endpoints) {
    try {
      const r = await fetch(ep, {
        headers: {
          "Origin": "https://tiapenhaburger.saipos.com",
          "Referer": "https://tiapenhaburger.saipos.com/",
          "User-Agent": "Mozilla/5.0"
        }
      });
      console.log(ep, "Status:", r.status);
      if (r.ok) {
        const data = await r.json();
        console.log("Success! Keys:", Object.keys(data));
      }
    } catch (e) {
      console.log(ep, "Error:", e.message);
    }
  }
}
run();
