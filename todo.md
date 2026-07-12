# Project TODO

- [x] Basic campground listing with filtering
- [x] Campground detail pages with reviews
- [x] Translation feature (English reviews to Chinese)
- [x] Review keyword highlighting (search "noise" or "shower" highlights matching text)
- [x] Campsite map annotations (mark recommended/avoid sites on map)
- [x] Favorites and comparison features
- [x] Itinerary planner
- [x] Fix translation feature (migrated from vite plugin to Express route, verified working with 200 response)
- [x] Research non-Recreation.gov review sources
- [x] Implement Google Maps Places API review fetcher (primary source for all 24 campgrounds)
- [x] Implement Recreation.gov API review fetcher (secondary source for 10 federal campgrounds)
- [x] Implement KOA website review scraper (secondary source for 1 KOA campground)
- [x] Implement LLM-based review distillation pipeline (gpt-5-mini with structured JSON output)
- [x] Create scheduled Heartbeat handler (POST /api/scheduled/update-reviews)
- [x] Move translate/places APIs from vite plugins to Express routes
- [x] Register review management tRPC router
- [x] Create Heartbeat cron job (weekly Monday 3AM UTC)
- [x] Verify area summaries and activities are based on actual reviews (confirmed: all activities cite specific reviewers, area insights include review counts and ratings)
- [x] Adjust review fetcher priority: Recreation.gov and KOA as PRIMARY sources, Google Maps as fallback only
- [x] Implement admin panel page (manual trigger, update logs, review count per campground)
- [x] Add review trend visualization (rating over time, review count growth) to campground detail pages
- [x] Add 12 first-priority campgrounds per checklist (Fort Worden, Grayland Beach, Wenatchee Confluence, Fort Flagler, Hoh Rain Forest, Moran, South Beach OR, Nehalem Bay, Honeyman, Silver Falls, Wallowa Lake, Detroit Lake)
- [x] Add tier/category system: 顶级热门, 明显热门, 区域家庭优选, 商业度假型, 2026受限
- [x] Demote Pacific Shores Motorcoach Resort (不适配目标车型)
- [x] Demote Little Crater Lake and Farewell Bend to 区域家庭优选
- [x] Mark Ohanapecosh as 2026受限 (全年关闭)
- [x] Mark Cape Disappointment and Cape Lookout as 2026受限 (施工)
- [x] Update site title/subtitle to reflect WA-OR scope (36个精选营地, 1.5-8小时)
- [x] Create review data files for 12 new campgrounds
- [x] Add tier filter to homepage
- [x] Add ~13 second-priority campgrounds (Sol Duc, Harris Beach, Colonial Creek, Lincoln Rock, Fort Casey, Fort Ebey, Larrabee, Steamboat Rock, Bullards Beach, Champoeg, Sunset Bay, The Cove Palisades, La Pine)
- [x] Add 2026-restricted campground reopening date reminders (display expected reopen dates on cards/detail pages)
- [x] Add status checking for restricted campgrounds in scheduled updates
- [x] Implement interactive map view page for browsing campgrounds by region

## QA Round 1 Fixes
- [x] P0: Fix InsightsPanel crash for campgrounds 25-36 (handle string vs array schema mismatch)
- [x] P0: Fix ReviewsSection crash for campgrounds 37-49 (handle missing totalReviewsOnPlatform field)
- [x] P0: Fix reviewInsights.json keys CG37-CG49 → 37-49
- [x] P1: Fix Cape Lookout closure status (park is open, construction starts Aug 3 2026)
- [x] P1: Fix Ohanapecosh bookingUrl (232464 → 232465)
- [x] P1: Fix drive times for Cove Palisades, LaPine, Harris Beach, Bullards Beach, Sunset Bay
- [x] P1: Fix hero text to match actual data range (1.5-7.5小时)
- [x] P2: Show warning text on homepage cards for camps with warning field
- [x] P2: Unify driveTimeLabel format (normalized to 0.25h increments)

## QA Round 2 Fixes
- [x] Remove fabricated Moran State Park closure (no evidence of water pipe replacement closure)
- [x] Remove fabricated Larrabee State Park closure (no evidence, kept train noise warning)
- [x] Fix Mora Road closure date (Oct 15 → Oct 5, clarify campground stays open)
- [x] Fix Mora Campground bookingUrl (232465 → 247591)
- [x] Fix Crater Lake Mazama bookingUrl (232463 → 10337002)
- [x] Fix South Beach Campground (not on rec.gov, is first-come-first-served)
- [x] Verify remaining warnings (Fort Casey/Ebey jets ✓ NAS Whidbey confirmed, Bullards plover ✓ Mar 15-Sep 15 confirmed)

## QA Round 3 Fixes
- [x] Fix Google Maps "included multiple times" error (singleton pattern for script loading)
- [x] Fix campgroundConfig.ts rec.gov IDs to match corrected bookingUrls

## Follow-up Improvements
- [x] Add "last updated" timestamp to campground data and display on cards/detail pages
- [x] Mobile-responsive map page with bottom drawer layout (replace sidebar on mobile)
- [x] Enrich batch 2/3 campgrounds with deep data (area ratings, kid activities, availability insights)

## Bug Fixes (User Reported)
- [x] Fix KOA campground broken image
- [x] Improve review distillation quality for campgrounds with many reviews but sparse insights
- [x] Fix all broken images across photos.ts (KOA placeholders, Salt Creek, Ohanapecosh, Beverly Beach, Pacific Shores)
