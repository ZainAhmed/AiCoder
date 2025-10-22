import { NextResponse } from "next/server";
import OpenAI from "openai";
import { INPUT_PROMPT } from "@/utils/constants";
export async function POST(req: Request) {
  const client = new OpenAI();
  const imageUrl = await req.json();

  try {
    // const response = await client.responses.create({
    //   model: "gpt-5-nano",
    //   input: [
    //     {
    //       role: "user",
    //       content: [
    //         { type: "input_text", text: "what is in this image?" },
    //         {
    //           type: "input_image",
    //           image_url:
    //             "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
    //         },
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
