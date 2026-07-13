import { useState } from "react";
import { MapPin, Map as MapIcon, ExternalLink, ImageIcon } from "lucide-react";
import { usePlacePhoto, extractSearchQuery } from "@/hooks/usePlacePhoto";

interface ActivityCardProps {
  name: string;
  ageRange: string;
  distance: string;
  details: string;
  mapUrl?: string;
  googleRating?: string;
  fallbackPhoto?: string;
}

export function ActivityCard({ name, ageRange, distance, details, mapUrl, googleRating, fallbackPhoto }: ActivityCardProps) {
  const [imgError, setImgError] = useState(false);
  
  // Always try Places API when mapUrl exists - it provides real location photos
  const searchQuery = mapUrl ? extractSearchQuery(mapUrl) : undefined;
  const { photoUrl: placePhotoUrl, loading } = usePlacePhoto(searchQuery);
  
  // Priority: Places API real photo > curated fallback photo (Unsplash)
  const photoSrc = placePhotoUrl || fallbackPhoto || null;
  const isPlacePhoto = !!placePhotoUrl;

  return (
    <div className="rounded-lg border border-border/60 overflow-hidden hover:shadow-md transition-shadow">
      {(photoSrc || loading) && !imgError && (
        <div className="relative h-40 overflow-hidden bg-muted">
          {loading && !placePhotoUrl && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
              <ImageIcon size={24} className="text-muted-foreground/40" />
            </div>
          )}
          {photoSrc && (
            <img
              src={photoSrc}
              alt={name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <h4 className="absolute bottom-3 left-4 font-medium text-white text-sm drop-shadow-md">{name}</h4>
          {isPlacePhoto && (
            <span className="absolute top-2 right-2 text-[9px] bg-black/50 text-white/80 px-1.5 py-0.5 rounded">
              Google Maps 实景
            </span>
          )}
        </div>
      )}
      <div className="p-4">
        {((!photoSrc && !loading) || imgError) && <h4 className="font-medium text-sm mb-1.5">{name}</h4>}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-lake/10 text-lake font-mono">{ageRange}</span>
          <span className="inline-flex items-center gap-1">
            <MapPin size={10} />
            {distance}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{details}</p>
        {googleRating && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
              ⭐ {googleRating}
            </span>
          </div>
        )}
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-md bg-forest/10 text-forest text-xs font-medium hover:bg-forest/20 transition-colors"
          >
            <MapIcon size={12} />
            在 Google Maps 查看真实照片和评价
            <ExternalLink size={10} />
          </a>
        )}
      </div>
    </div>
  );
}
