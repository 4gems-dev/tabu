import { anthropic } from "@/lib/chatbot";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    // max_tokens: 1024,
    max_tokens: 100,
    messages: [
      {
        role: "user",
        content:
          "Hi, I am 20 years old with some spare money which I want to invest. I am interested in tech oriented companies. Do you have some recommendations based on current data?",
      },
    ],
    system:
      "You are a chatbot included in a bank app. Your purpose is to answer questions mostly regarding investments and provide advise. Prompts will be in English and you should also respond in English.",
    temperature: 0.0,
  });
  console.log(msg);

  res.status(200).json({ name: "John Doe" });
}
