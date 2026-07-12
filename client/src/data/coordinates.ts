// GPS coordinates for all 36 campgrounds
// Used for Google Maps integration

export interface CampgroundCoords {
  lat: number;
  lng: number;
}

export const campgroundCoords: Record<number, CampgroundCoords> = {
  1: { lat: 48.3955, lng: -122.6554 },  // Deception Pass
  2: { lat: 46.9120, lng: -122.9080 },  // Millersylvania
  3: { lat: 46.7870, lng: -122.3160 },  // Alder Lake
  4: { lat: 46.7680, lng: -121.7900 },  // Cougar Rock
  5: { lat: 47.8120, lng: -120.7260 },  // Lake Wenatchee
  6: { lat: 46.7310, lng: -121.5680 },  // Ohanapecosh
  7: { lat: 48.0720, lng: -123.9060 },  // Fairholme
  8: { lat: 47.8340, lng: -120.1780 },  // Lake Chelan
  9: { lat: 47.2100, lng: -124.2000 },  // Pacific Beach
  10: { lat: 48.1620, lng: -123.6930 }, // Salt Creek
  11: { lat: 47.6130, lng: -124.3740 }, // Kalaloch
  12: { lat: 46.1530, lng: -123.9280 }, // Astoria KOA
  13: { lat: 47.5350, lng: -124.3530 }, // South Beach
  14: { lat: 46.2070, lng: -123.9620 }, // Fort Stevens
  15: { lat: 44.7270, lng: -124.0580 }, // Beverly Beach
  16: { lat: 46.2880, lng: -124.0550 }, // Cape Disappointment
  17: { lat: 45.2680, lng: -121.7380 }, // Trillium Lake
  18: { lat: 47.9230, lng: -124.6120 }, // Mora
  19: { lat: 45.1480, lng: -121.7440 }, // Little Crater Lake
  20: { lat: 44.1280, lng: -121.3330 }, // Tumalo
  21: { lat: 45.3530, lng: -123.9720 }, // Cape Lookout
  22: { lat: 42.6550, lng: -122.6780 }, // Farewell Bend
  23: { lat: 42.8660, lng: -122.1680 }, // Crater Lake Mazama
  24: { lat: 44.7530, lng: -124.0620 }, // Pacific Shores
  25: { lat: 48.1340, lng: -122.7640 }, // Fort Worden
  26: { lat: 46.7950, lng: -124.0890 }, // Grayland Beach
  27: { lat: 47.4550, lng: -120.4380 }, // Wenatchee Confluence
  28: { lat: 48.0870, lng: -122.7010 }, // Fort Flagler
  29: { lat: 47.8600, lng: -123.9340 }, // Hoh Rain Forest
  30: { lat: 48.6530, lng: -122.8310 }, // Moran State Park
  31: { lat: 44.5960, lng: -124.0640 }, // South Beach OR
  32: { lat: 45.6950, lng: -123.9380 }, // Nehalem Bay
  33: { lat: 43.8770, lng: -124.1170 }, // Honeyman
  34: { lat: 44.8770, lng: -122.6540 }, // Silver Falls
  35: { lat: 45.3260, lng: -117.2120 }, // Wallowa Lake
  36: { lat: 44.7190, lng: -122.1530 }, // Detroit Lake
};

// Redmond, WA (starting point for directions)
export const REDMOND_COORDS: CampgroundCoords = { lat: 47.6740, lng: -122.1215 };
