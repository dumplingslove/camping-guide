/**
 * Translation API endpoint - translates English camping reviews to Chinese
 * using the built-in LLM (gpt-5-nano for speed/cost).
 */

import type { Request, Response } from "express";
import { invokeLLM } from "../_core/llm";

export async function translateHandler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Invalid text" });
    }

    // Truncate very long texts to keep response fast
    const truncatedText = text.length > 2000 ? text.slice(0, 2000) + "..." : text;

    const result = await invokeLLM({
      model: "gpt-5-nano",
      messages: [
        { role: "system", content: "将以下英文露营评论翻译成简洁的中文。保持关键信息，语言自然。只输出翻译。" },
        { role: "user", content: truncatedText },
      ],
      maxTokens: 1000,
    });

    const translation = result.choices?.[0]?.message?.content || "翻译失败";

    res.setHeader("Cache-Control", "public, max-age=86400");
    res.json({ translation });
  } catch (error) {
    console.error("[Translate] Error:", error);
    res.status(502).json({ error: "Translation failed" });
  }
}
