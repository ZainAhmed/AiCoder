import { NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
export async function POST(req: Request) {
  const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;
  console.log("api called");
  const imageUrls = await req.json();
  const firstImageUrl = imageUrls[0];
  if (!HF_TOKEN) {
    throw new Error("HUGGINGFACE_API_KEY is missing");
  }

  const client = new InferenceClient(HF_TOKEN);

  try {
    const result = await client.imageToText({
      model: "Salesforce/blip-vqa-base",
      data: await (await fetch("https://picsum.photos/300/300")).blob(),
      parameters: {
        question: "what is in the image",
      },
    });
    console.log("Answer:", result.answer);
    // const response = await client.chat.completions.create({
    //   model: "Salesforce/blip2-flan-t5-xl-coco",
    //   messages: [
    //     {
    //       role: "user",
    //       content: [
    //         { type: "text", text: "Generate React code based on this image:" },
    //         { type: "image_url", image_url: { url: firstImageUrl } },
    //       ],
    //     },
    //   ],
    // });
    // console.log("response", response.choices[0].message);
    return NextResponse.json("test");
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.status || 500 }
    );
  }
}
