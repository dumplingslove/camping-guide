import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Translation API endpoint
  app.post("/api/translate", async (req, res) => {
    const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
    const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!forgeBaseUrl || !forgeKey) {
      res.status(500).json({ error: "Translate not configured" });
      return;
    }

    const { text } = req.body;
    if (!text || text.length > 5000) {
      res.status(400).json({ error: "Invalid text" });
      return;
    }

    try {
      const resp = await fetch(`${forgeBaseUrl}/v1/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${forgeKey}`,
        },
        body: JSON.stringify({
          model: "gpt-5-nano",
          messages: [
            { role: "system", content: "\u4f60\u662f\u4e00\u4e2a\u7ffb\u8bd1\u52a9\u624b\u3002\u5c06\u4ee5\u4e0b\u82f1\u6587\u9732\u8425\u8bc4\u8bba\u7ffb\u8bd1\u6210\u4e2d\u6587\u3002\u4fdd\u6301\u539f\u610f\uff0c\u8bed\u8a00\u81ea\u7136\u6d41\u7545\u3002\u53ea\u8f93\u51fa\u7ffb\u8bd1\u7ed3\u679c\uff0c\u4e0d\u8981\u6dfb\u52a0\u4efb\u4f55\u89e3\u91ca\u3002" },
            { role: "user", content: text },
          ],
        }),
      });

      const data = await resp.json() as any;
      const translation = data.choices?.[0]?.message?.content || "\u7ffb\u8bd1\u5931\u8d25";
      res.json({ translation });
    } catch {
      res.status(502).json({ error: "Translation failed" });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
