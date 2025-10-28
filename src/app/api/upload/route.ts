import { NextResponse } from "next/server";
import ImageKit from "imagekit";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  // Ensure the uploads folder exists
  // const uploadsDir = path.join(process.cwd(), "public/uploads");
  // if (!fs.existsSync(uploadsDir)) {
  //   fs.mkdirSync(uploadsDir, { recursive: true });
  // }

  const imagekit = new ImageKit({
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGE_KIT_URL as string,
  });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name}`;

  try {
    const result = await new Promise<any>((resolve, reject) => {
      imagekit.upload({ file: buffer, fileName: filename }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
    return NextResponse.json({ url: result.url, fileId: result.fileId });
  } catch (error) {
    return NextResponse.json(
      { error: "Upload failed", details: String(error) },
      { status: 500 }
    );
  }
}
