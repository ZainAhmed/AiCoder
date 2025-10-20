import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { imageUrl } = await req.json();

  const response = await client.chat.completions.create({
    model: "gpt-4.1",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Generate React code based on this image:" },
          { type: "image_url", image_url: { url: imageUrl } },
        ],
      },
    ],
  });
  console.log("response", response.choices[0].message);
  return NextResponse.json(response.choices[0].message);
}
