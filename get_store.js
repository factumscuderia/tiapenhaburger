async function run() {
  const params = {
    domain_name: "tiapenhaburger.saipos.com",
    is_table_module: false,
    no_cache: Date.now()
  };
  const url = `https://delivery-api.saipos.com/v1/stores?filter=${encodeURIComponent(JSON.stringify(params))}`;
  console.log("Fetching:", url);

  const res = await fetch(url, {
    headers: {
      "Origin": "https://tiapenhaburger.saipos.com",
      "Referer": "https://tiapenhaburger.saipos.com/"
    }
  });

  console.log("Status:", res.status);
  const data = await res.json();
  console.log("Result:", JSON.stringify(data).slice(0, 500));

  if (Array.isArray(data) && data[0]) {
    const store = data[0];
    console.log("Store ID:", store.id, "Store Name:", store.name);
  }
}
run();
