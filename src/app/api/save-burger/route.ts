import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { id, dataUrl } = await req.json();
    if (!id || !dataUrl) {
      return NextResponse.json({ error: "Missing id or dataUrl" }, { status: 400 });
    }

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const outDir = path.join(process.cwd(), "public", "images", "burgers");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const filePath = path.join(outDir, `${id}.png`);
    fs.writeFileSync(filePath, buffer);

    console.log(`Saved burger image: ${filePath} (${buffer.length} bytes)`);
    return NextResponse.json({ success: true, path: `/images/burgers/${id}.png` });
  } catch (error) {
    console.error("Error saving burger image:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
