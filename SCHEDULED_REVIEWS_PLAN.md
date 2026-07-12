# Scheduled Review Update System - Implementation Plan

## Architecture
- **Type**: Project-level Heartbeat (§4a) - no end-user interaction needed
- **Frequency**: Weekly (every Sunday at 2:00 AM UTC = Saturday 7PM PDT)
- **Cron**: `0 0 2 * * 0` (6-field: sec min hour dom mon dow)
- **Callback path**: `/api/scheduled/update-reviews`
- **Created via**: `manus-heartbeat create` CLI (project owner identity)

## Data Sources

### Recreation.gov API (10 campgrounds)
- IDs: 4, 6, 7, 11, 13, 17, 18, 19, 22, 23
- Endpoint: `https://www.recreation.gov/api/ratingreview/public?facilityId={id}&page=0&size=50&sortBy=MOST_RECENT`
- No auth required, returns JSON with reviews array
- Each review has: rating, title, body, createdDate, siteNumber, loop, siteType, stayStartDate, stayEndDate, helpfulVotes

### Google Maps Places API (13 campgrounds)
- IDs: 1, 2, 3, 5, 8, 9, 10, 14, 15, 16, 20, 21, 24
- Via Manus forge proxy: `${BUILT_IN_FORGE_API_URL}/v1/maps/proxy/maps/api/place/textsearch/json?query={name}&key=${BUILT_IN_FORGE_API_KEY}`
- Then place details: `${BUILT_IN_FORGE_API_URL}/v1/maps/proxy/maps/api/place/details/json?place_id={id}&fields=reviews&key=${BUILT_IN_FORGE_API_KEY}`
- Returns up to 5 most relevant reviews per place

### KOA Reviews (1 campground - ID 12)
- URL: https://koa.com/campgrounds/astoria/reviews/?sortBy=DateUpdated
- HTML scraping - reviews are in page content
- Multiple pages available via ?page=N parameter

## Callback Handler Logic
1. Fetch new reviews from all 3 sources
2. Merge with existing reviews (deduplicate by date + author)
3. Write updated per-campground JSON files to client/src/data/reviews/
4. If new reviews found, run LLM distillation (gpt-5-mini) to update reviewInsights.json
5. Return success/failure status

## Key Files
- `server/_core/heartbeat.ts` - SDK for creating/managing Heartbeat jobs
- `server/_core/index.ts` - Mount handler at `/api/scheduled/update-reviews`
- `server/_core/llm.ts` - LLM calls for distillation (invokeLLM)
- `client/src/data/reviews/campground_{id}.json` - Review data files (write target)
- `client/src/data/reviewInsights.json` - Distilled insights (write target)

## Important Notes
- Site MUST be deployed before creating the Heartbeat job
- Handler timeout is 2 minutes - need to be efficient
- Handler must be idempotent (retried on 5xx)
- Must authenticate via `sdk.authenticateRequest(req)` and check `user.isCron`
- Need to apply legacy patches to sdk.ts and manusTypes.ts for cron auth

## Recreation.gov Facility IDs (from previous scraping)
- Cougar Rock (ID 4): facilityId=232464
- Ohanapecosh (ID 6): facilityId=232465
- Fairholme (ID 7): facilityId=232463
- Kalaloch (ID 11): facilityId=232464 (need to verify)
- South Beach (ID 13): facilityId=233271
- Trillium Lake (ID 17): facilityId=232498
- Mora (ID 18): facilityId=232461
- Little Crater Lake (ID 19): facilityId=232499
- Farewell Bend (ID 22): facilityId=232497
- Crater Lake Mazama (ID 23): facilityId=232462

## LLM Distillation
- Model: gpt-5-mini ($0.25/$2.00 per 1M tokens)
- Structured output with JSON schema
- Extract: tags, cell coverage, wildlife, facilities, noise, recommended/avoid sites, area insights, activities
