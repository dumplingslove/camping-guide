/**
 * Google Places API proxy endpoints - proxies requests through Manus Forge
 * to access Google Maps Places API (text search and photos).
 */

import type { Request, Response } from "express";
import { ENV } from "../_core/env";

export async function placesSearchHandler(req: Request, res: Response) {
  const forgeBaseUrl = (ENV.forgeApiUrl || "").replace(/\/+$/, "");
  const forgeKey = ENV.forgeApiKey;

  if (!forgeBaseUrl || !forgeKey) {
    return res.status(500).json({ error: "Places proxy not configured" });
  }

  try {
    const query = req.query.query as string || "";
    const targetUrl = `${forgeBaseUrl}/v1/maps/proxy/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${forgeKey}`;

    const resp = await fetch(targetUrl);
    const data = await resp.text();
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.status(resp.status).send(data);
  } catch {
    res.status(502).json({ error: "Places search failed" });
  }
}

export async function placesPhotoHandler(req: Request, res: Response) {
  const forgeBaseUrl = (ENV.forgeApiUrl || "").replace(/\/+$/, "");
  const forgeKey = ENV.forgeApiKey;

  if (!forgeBaseUrl || !forgeKey) {
    return res.status(500).json({ error: "Places proxy not configured" });
  }

  try {
    const photoRef = req.query.ref as string || "";
    const maxW = req.query.maxwidth as string || "600";
    const targetUrl = `${forgeBaseUrl}/v1/maps/proxy/maps/api/place/photo?maxwidth=${maxW}&photo_reference=${encodeURIComponent(photoRef)}&key=${forgeKey}`;

    // Don't follow redirects - we want the Location header
    const resp = await fetch(targetUrl, { redirect: "manual" });
    const location = resp.headers.get("location");

    if (location) {
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.json({ photoUrl: location });
    } else {
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.json({ photoUrl: targetUrl });
    }
  } catch {
    res.status(502).json({ error: "Photo fetch failed" });
  }
}
