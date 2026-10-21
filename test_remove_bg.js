const { removeBackground } = require("@imgly/background-removal-node");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function test() {
  console.log("Starting bg removal test...");
  const outDir = path.join(__dirname, "public", "images", "burgers");
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const url = "https://static.saipos.com/saipos-estatico/img-items/87707/store_item/d44d7a591b303e38ad1bef5b28d499d5.png";
  console.log("Fetching image...");
  const res = await fetch(url);
  const rawBuf = Buffer.from(await res.arrayBuffer());
  console.log("Converting HEIF/AVIF to standard PNG buffer via Sharp...");
  const pngBuf = await sharp(rawBuf).png().toBuffer();
  console.log("Converted to PNG. Bytes:", pngBuf.length);

  console.log("Passing PNG buffer to removeBackground...");
  const blob = await removeBackground(pngBuf);
  const buffer = Buffer.from(await blob.arrayBuffer());
  const dest = path.join(outDir, "tia-penha.png");
  fs.writeFileSync(dest, buffer);
  console.log("SUCCESS! Saved cutout burger to:", dest, "Size:", buffer.length);
}

test().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
