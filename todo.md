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

## New Features (User Request)
- [x] Add summary table to homepage showing all 49 campgrounds with key info and visited status
- [x] Improve visited record feature to support end date (date range instead of single date)
- [x] Migrate visited records from localStorage to database (cross-device sync)
- [x] Add visited statistics dashboard page with camping stats, state/monthly distribution charts

## QA Report Fixes (2026-07-12)
- [x] P0-5: Fix filter whitespace - grid retains ~7500px blank space when filtered to few results
- [x] P0-4: Fix content contradictions (Deception Pass site numbers, Bowman Bay count, Cape Disappointment season, Pacific Shores truck camper conflict)
- [x] P0-1: Fix map gray/blank issue and add coordinates for IDs 37-49
- [x] P0-3: Enrich batch D (IDs 37-49) with descriptions, activities, areas, availability, booking windows
- [x] P0-3: Enrich batch C (IDs 25-36) with activities, areas, availability analysis
- [x] P0-2: Add galleries for 28 campgrounds missing them (single hero photo with caption)
- [x] P0-2: Fix caption/photo count mismatches in existing 21 galleries
- [x] Compare page: Fix image cropping (images compressed to extremely wide narrow strips)
- [x] Gallery: Fix cross-campground duplicate images (Cougar Rock, Lake Wenatchee, Kalaloch)
- [x] Gallery: Ensure hero image is included in gallery for all campgrounds
- [x] Champoeg: Replace campground map main image with actual scenic photo

## Final QA Report Fixes (2026-07-12)
- [x] P0-BUG1: Fix InsightsPanel crash for campgrounds 25-36 (type mismatch in recommendedSites/areaInsights/activitiesFromReviews)
- [x] P0-BUG2: Fix ReviewsSection crash for campgrounds 37-49 (totalReviewsOnPlatform vs googleTotalRatings field name)
- [x] P0-BUG3: Fix reviewInsights.json key naming (CG37-CG49 should be 37-49)
- [x] P1-1: Fix Cape Lookout status - remove closed tag, update to future closure notice (Aug 3, 2026)
- [x] P1-2: Fix Ohanapecosh bookingUrl (232464 is Kalaloch, correct is 232465)
- [x] P1-3: Fix drive times for Cove Palisades, LaPine, Harris Beach, Bullards Beach, Sunset Bay
- [x] P1-4: Fix hero text "1.5-7小时" to match actual data range
- [x] P2-1: Show brief warning reason on homepage cards with "注意" label
- [x] P2-2: Unify driveTimeLabel format (remove range format like "3-3.5h")
- [x] P2-3: Disambiguate two "南海滩" campground names

## New Features (User Request 2026-07-12)
- [x] Add Google Maps links for all 49 campgrounds to summary table
- [x] Fix incorrect campsite map annotations (removed fake markers, replaced with clean list view)
- [x] Add more gallery photos for campgrounds 25-49 (3 photos each)
- [x] Fix all 49 campground bookingUrls to link directly to correct campground pages

## User Request (2026-07-13)
- [x] Add Google Maps link to campground detail page summary section
- [x] Fix all booking URLs to link directly to reservation/booking pages (not campground info pages)
- [x] Fix Lake Chelan State Park area/loop information (incorrect data)

## Area Data Audit (2026-07-13)
- [x] Audit and verify area info for all 49 campgrounds against official sources
- [x] Fix any incorrect area names, site numbers, or descriptions (19 major + 8 minor fixes applied)

## Area Name Unification (2026-07-13)
- [x] Convert all Chinese area names to English (23 replacements)
- [x] Sync vacancyAnalysis and bookingWindows area names to match updated areas
- [x] Verify and fix IDs 2 (Millersylvania), 16 (Cape Disappointment), 27 (Wenatchee Confluence)

## QA Report Round 2 Fixes (2026-07-13)
- [x] P0: Map page tiles confirmed working (49 markers visible, tiles loading correctly)
- [x] P1: Add description, reviewCount, bookingWindows for IDs 37-49 (13 campgrounds)
- [x] P1: Add campsite maps for IDs 25-49 (25 maps uploaded)
- [x] P1: Add photos to reach 4+ per campground (all 49 now have 4+)
- [x] P2: Unify hero image into photos[] array (prepended as first photo)
- [x] P2: Fix compare page image cropping (aspect-[4/3] + object-top)
