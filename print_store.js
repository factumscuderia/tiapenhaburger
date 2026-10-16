async function run() {
  const params = {
    domain_name: "tiapenhaburger.saipos.com",
    is_table_module: false,
    no_cache: Date.now()
  };
  const url = `https://delivery-api.saipos.com/v1/stores?filter=${encodeURIComponent(JSON.stringify(params))}`;
  const res = await fetch(url);
  const data = await res.json();
  const store = data[0];
  console.log("Store keys:", Object.keys(store));
  for (const k of Object.keys(store)) {
    if (typeof store[k] === 'object' && store[k] !== null) {
      console.log(`Key ${k}: isArray=${Array.isArray(store[k])}, keys=${Object.keys(store[k]).slice(0, 10)}`);
    } else {
      console.log(`Key ${k}: ${store[k]}`);
    }
  }
}
run();
