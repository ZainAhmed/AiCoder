import { NextResponse } from "next/server";
import OpenAI from "openai";
// import { INPUT_PROMPT } from "@/utils/constants";
export async function POST(req: Request) {
  const client = new OpenAI();
  const imageUrls: string[] = await req.json();

  try {
    // const response = await client.responses.create({
    //   model: "gpt-5-nano",
    //   input: [
    //     {
    //       role: "user",
    //       content: [
    //         { type: "input_text", text: "Describe these images together." },
    //         ...imageUrls.map((url) => ({
    //           type: "input_image" as const,
    //           image_url: url,
    //           detail: "auto" as const,
    //         })),
    //       ],
    //     },
    //   ],
    // });

    // console.log(response);

    return NextResponse.json("test");
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: err.status || 500 }
    );
  }
}
