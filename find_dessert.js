const fs = require("fs");
const raw = JSON.parse(fs.readFileSync("saipos_menu_raw.json", "utf8"));
for (const item of raw.items) {
  if (item.category_item?.desc_store_category_item === "SOBREMESAS" || item.desc_store_item.toLowerCase().includes("croissant")) {
    console.log(item.desc_store_item, item.variations?.[0]?.price, item.detail);
  }
}
