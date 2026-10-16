const fs = require("fs");
const raw = JSON.parse(fs.readFileSync("saipos_menu_raw.json", "utf8"));

console.log("Total items in raw:", raw.items.length);
console.log("Total choices:", raw.choices.length);

// List all categories and items
const categoryMap = {};
for (const item of raw.items) {
  const catName = item.category_item?.desc_store_category_item || "OUTROS";
  if (!categoryMap[catName]) categoryMap[catName] = [];
  
  const price = item.variations?.[0]?.price ?? 0;
  categoryMap[catName].push({
    id: String(item.id_store_item),
    name: item.desc_store_item,
    description: item.detail || "",
    price: price,
    image: item.img_path ? `https://static.saipos.com/${item.img_path}` : null,
    choices: item.choices?.map(c => c.id_store_choice) || []
  });
}

for (const [cat, items] of Object.entries(categoryMap)) {
  console.log(`\n=== CATEGORIA: ${cat} (${items.length} itens) ===`);
  for (const it of items) {
    console.log(`- ${it.name} | R$ ${it.price.toFixed(2)} | ${it.description.slice(0, 60)}...`);
  }
}

// Print all choices
console.log("\n=== ALL CHOICES GROUPS ===");
for (const ch of raw.choices) {
  console.log(`\nChoice ID ${ch.id_store_choice}: ${ch.desc_store_choice} (${ch.desc_store_choice_delivery}) | min: ${ch.min_choices}, max: ${ch.max_choices}`);
  for (const it of ch.choice_items || []) {
    const addPrice = it.variations?.[0]?.aditional_price ?? 0;
    console.log(`  * ${it.desc_store_choice_item} (+ R$ ${addPrice.toFixed(2)})`);
  }
}
