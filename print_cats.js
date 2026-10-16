const fs = require("fs");
const raw = JSON.parse(fs.readFileSync("saipos_menu_raw.json", "utf8"));
const cats = new Set();
for (const item of raw.items) {
  cats.add(item.category_item?.desc_store_category_item);
}
console.log("All categories present:", Array.from(cats));
