import { NextRequest, userAgent } from "next/server";

/**
 * Determines the appropriate audio response format based on the user agent
 * @param req - The Next.js request object
 * @returns "wav" for Blink engine (Chrome), "mp3" otherwise
 */
export function getResponseFormat(req: NextRequest): "wav" | "mp3" {
  const ua = userAgent(req);
  return ua.engine?.name === "Blink" ? "wav" : "mp3";
}

/**
 * Builds the OpenAI TTS API request payload
 * @param input - The text to convert to speech
 * @param voice - The voice to use
 * @param responseFormat - The audio format (wav or mp3)
 * @param prompt - Optional instructions for the TTS
 * @returns The request body as a JSON string
 */
export function buildSpeechApiPayload(
  input: string,
  voice: string,
  responseFormat: "wav" | "mp3",
  prompt?: string
): string {
  return JSON.stringify({
    model: "gpt-4o-mini-tts",
    input,
    response_format: responseFormat,
    voice,
    // Don't pass if empty
    ...(prompt && { instructions: prompt }),
  });
}
