import { useState, useEffect } from "react";

// Cache to avoid repeated API calls
const photoCache: Record<string, string | null> = {};

/**
 * Fetches a real Google Maps photo for a place using the legacy Places API.
 * Uses the local Vite proxy at /api/places to avoid CORS issues.
 */
export function usePlacePhoto(query: string | undefined): {
  photoUrl: string | null;
  loading: boolean;
} {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    // Check cache first
    if (photoCache[query] !== undefined) {
      setPhotoUrl(photoCache[query]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    const cacheKey = query;
    async function fetchPhoto() {
      try {
        // Step 1: Use legacy Places Text Search to find the place
        const searchResp = await fetch(`/api/places/search?query=${encodeURIComponent(query!)}`);

        if (!searchResp.ok) {
          throw new Error(`Places search error: ${searchResp.status}`);
        }

        const data = await searchResp.json();
        const results = data.results;

        if (results && results.length > 0 && results[0].photos && results[0].photos.length > 0) {
          // Get the first photo reference
          const photoRef = results[0].photos[0].photo_reference;
          
          // Step 2: Get the photo URL via proxy
          const photoResp = await fetch(`/api/places/photo?ref=${encodeURIComponent(photoRef)}&maxwidth=600`);

          if (photoResp.ok) {
            const photoData = await photoResp.json();
            if (photoData.photoUrl) {
              if (!cancelled) {
                photoCache[cacheKey] = photoData.photoUrl;
                setPhotoUrl(photoData.photoUrl);
              }
              return;
            }
          }
          
          if (!cancelled) {
            photoCache[cacheKey] = null;
            setPhotoUrl(null);
          }
        } else {
          if (!cancelled) {
            photoCache[cacheKey] = null;
            setPhotoUrl(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch place photo:", err);
        if (!cancelled) {
          photoCache[cacheKey] = null;
          setPhotoUrl(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPhoto();
    return () => {
      cancelled = true;
    };
  }, [query]);

  return { photoUrl, loading };
}

/**
 * Extract a search query from a Google Maps URL for use with Places API
 */
export function extractSearchQuery(mapUrl: string): string {
  try {
    const url = new URL(mapUrl);
    // For /maps/search/... URLs
    const searchMatch = url.pathname.match(/\/maps\/search\/(.+)/);
    if (searchMatch) {
      return decodeURIComponent(searchMatch[1].replace(/\+/g, " "));
    }
    // For /maps/place/... URLs
    const placeMatch = url.pathname.match(/\/maps\/place\/(.+?)(?:\/|$)/);
    if (placeMatch) {
      return decodeURIComponent(placeMatch[1].replace(/\+/g, " "));
    }
  } catch {
    // fallback
  }
  return mapUrl;
}
