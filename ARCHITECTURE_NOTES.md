# Architecture Notes (for development reference)

## Current Auth System
- Uses Manus OAuth (openId-based)
- Session: JWT cookie named `app_session_id`, signed with JWT_SECRET
- SDK in `server/_core/sdk.ts` handles: createSessionToken(openId), verifySession(cookie), authenticateRequest(req)
- `createSessionToken` creates a JWT with payload: { openId, appId, name }
- `authenticateRequest` reads cookie → verifies JWT → looks up user by openId in DB
- Frontend: `useAuth()` hook calls `trpc.auth.me.useQuery()` to get current user

## Database
- User table: id, openId (unique), name, email, loginMethod, role (admin/user), timestamps
- Current user: id=1, openId=oKx5E3M253CDR4jF34pic4, name=Daran Cai, email=darancai@meta.com, role=admin
- Visited records: 2 entries (campground 2 site 76, campground 5 site 181) for userId=1
- Favorites: currently localStorage only (no DB table)

## Plan for Email+Password Login
1. Add `passwordHash` column to users table (nullable, for backward compat with OAuth users)
2. Create `/api/auth/login` endpoint: email+password → verify → create session token → set cookie
3. Create a login page at `/login` with email+password form
4. Keep Manus OAuth as fallback but add email+password as primary
5. Set password for existing admin user via a one-time setup script

## Plan for Favorites DB Migration
1. Add `favorites` table: id, userId, campgroundId, createdAt
2. Add tRPC router for favorites CRUD
3. Update FavoritesContext to use DB when authenticated, localStorage fallback when not
4. On login, detect localStorage favorites and migrate to DB
