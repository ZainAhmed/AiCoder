import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Ensure the uploads folder exists
  const uploadsDir = path.join(process.cwd(), "public/uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filename = file.name;
  const filePath = path.join(uploadsDir, filename);

  // Avoid overwriting existing file
  if (!fs.existsSync(filePath)) {
    await writeFile(filePath, buffer);
  }

  return NextResponse.json({ url: `/uploads/${filename}` });
}
