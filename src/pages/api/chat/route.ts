import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  cacheProvider,
  cacheProviderGet,
  cacheProviderHas,
} from "@/lib/cache/cacheProvider";
import { stockNames } from "@/lib/static/stockNames";
import { InterestsEnumArray, SuccessType } from "@/types";
import { GetServerSideProps } from "next";
import { ApiEndpointType } from "@/types/api";

// Create an Anthropic API client (that's edge friendly)
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export type ApiRoutePOST = ApiEndpointType<
  "POST",
  {
    messages: string[];
  },
  SuccessType<StreamingTextResponse, { error: string }>
>;

export default async function handler(
  req: ApiRoutePOST["request"],
  res: NextApiResponse<ApiRoutePOST["response"]>
) {
  switch (req.method) {
    case "POST":
      return await POST(req, res);
    default:
      return res.status(400).json({
        success: false,
        error: `You are not allowed to access this site!`,
      });
  }
}
export async function POST(
  req: ApiRoutePOST["request"],
  res: NextApiResponse<ApiRoutePOST["response"]>
) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.body;

  // Ask Claude for a streaming chat completion given the prompt
  const response = await anthropic.messages.create({
    messages,
    model: "claude-2.1",
    stream: true,
    max_tokens: 300,
  });

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
