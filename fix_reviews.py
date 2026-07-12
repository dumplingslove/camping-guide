"""
Fix review JSON files for campgrounds 25-49 to match the expected CampgroundReviews interface:
{
  campgroundName: string,
  totalReviewsOnPlatform: number,
  googleRating?: number,
  source: string,
  reviews: Review[]
}

Where Review is:
{
  author: string,
  rating: number,
  text: string,
  date: string,
  siteNumber: string,
  loop: string,
  siteType: string,
  stayStart: string,
  stayEnd: string,
  helpfulVotes: number,
  source: string,
  area?: string
}
"""
import json
import os
import glob

reviews_dir = 'client/src/data/reviews'

for filepath in sorted(glob.glob(f'{reviews_dir}/camp_*.json')):
    camp_id = int(filepath.split('camp_')[1].split('.json')[0])
    
    with open(filepath) as f:
        data = json.load(f)
    
    # Check if already in correct format
    if 'totalReviewsOnPlatform' in data and isinstance(data.get('totalReviewsOnPlatform'), (int, float)):
        # Already correct format (batch 1)
        continue
    
    # Determine the source and total reviews
    source = data.get('source', 'Google Maps')
    
    # Get total reviews on platform
    total_reviews = (
        data.get('totalReviewsOnPlatform') or
        data.get('googleTotalRatings') or
        data.get('totalRatings') or
        len(data.get('reviews', []))
    )
    if isinstance(total_reviews, str):
        # Try to extract number from string like "4.5★ (214 reviews)"
        import re
        m = re.search(r'(\d+)', total_reviews)
        total_reviews = int(m.group(1)) if m else len(data.get('reviews', []))
    
    # Get rating
    google_rating = (
        data.get('googleRating') or
        data.get('placeRating') or
        data.get('averageRating')
    )
    
    # Get campground name
    camp_name = data.get('campgroundName', f'Campground {camp_id}')
    
    # Normalize reviews
    normalized_reviews = []
    for r in data.get('reviews', []):
        normalized_reviews.append({
            'author': r.get('author', 'Anonymous'),
            'rating': r.get('rating', 0),
            'text': r.get('text', ''),
            'date': r.get('date', ''),
            'siteNumber': r.get('siteNumber', ''),
            'loop': r.get('loop', ''),
            'siteType': r.get('siteType', ''),
            'stayStart': r.get('stayStart', ''),
            'stayEnd': r.get('stayEnd', ''),
            'helpfulVotes': r.get('helpfulVotes', 0),
            'source': r.get('source', source),
            'area': r.get('area', ''),
        })
    
    # Build normalized file
    normalized = {
        'campgroundName': camp_name,
        'totalReviewsOnPlatform': int(total_reviews) if total_reviews else len(normalized_reviews),
        'source': source,
        'reviews': normalized_reviews,
    }
    if google_rating:
        normalized['googleRating'] = float(google_rating)
    
    with open(filepath, 'w') as f:
        json.dump(normalized, f, ensure_ascii=False, indent=2)
    
    print(f"Fixed camp_{camp_id}.json: {normalized['totalReviewsOnPlatform']} total reviews, {len(normalized_reviews)} shown, source={source}")

print("\nDone!")
