async function run() {
  const paramsList = [
    { saleModule: "delivery", idStoreSiteData: 74356 },
    { saleModule: "DELIVERY", idStoreSiteData: 74356 },
    { saleModule: 1, idStoreSiteData: 74356 },
    { idStoreSiteData: 74356 }
  ];

  for (const p of paramsList) {
    const url = `https://delivery-api.saipos.com/v1/stores/87707/sales/view-data?data=${encodeURIComponent(JSON.stringify(p))}`;
    console.log("Testing:", url);
    const res = await fetch(url, {
      headers: {
        "Origin": "https://tiapenhaburger.saipos.com",
        "Referer": "https://tiapenhaburger.saipos.com/"
      }
    });
    console.log("Status:", res.status);
    if (res.ok) {
      const data = await res.json();
      console.log("Success! Keys:", Object.keys(data));
      if (data.items) {
        console.log("Total items:", data.items.length);
        console.log("First item sample:", JSON.stringify(data.items[0], null, 2));
      }
      if (data.choices) {
        console.log("Total choices:", data.choices.length);
        console.log("First choice sample:", JSON.stringify(data.choices[0], null, 2));
      }
      // Save raw data to file
      const fs = await import("fs");
      fs.writeFileSync("saipos_menu_raw.json", JSON.stringify(data, null, 2));
      console.log("Saved to saipos_menu_raw.json!");
      break;
    }
  }
}
run();
