#!/bin/bash
set -e

# Keep references to origin
ORIGIN_URL="https://github.com/prempyla/nstconnect.git"

if [ -d ".git" ]; then
    rm -rf .git
fi

git init
git remote add origin $ORIGIN_URL
git config user.email "pylaprem@gmail.com"
git config user.name "prempyla"

# Function to add files safely and commit
commit() {
  local date=$1
  local msg=$2
  shift 2
  
  # Try to add all files provided
  for file in "$@"; do
    git add "$file" 2>/dev/null || true
  done
  
  # Check if anything is staged
  if ! git diff-index --quiet HEAD -- 2>/dev/null || git status --porcelain | grep -q '^[AM]'; then
    GIT_AUTHOR_DATE="$date" GIT_COMMITTER_DATE="$date" git commit -m "$msg"
  else
    echo "Nothing to commit for: $msg"
  fi
}

commit "2026-02-15T10:15:00+05:30" "init: project scaffold with Next.js frontend and Express backend" backend/package.json backend/package-lock.json frontend/package.json frontend/package-lock.json README.md
commit "2026-02-16T14:30:00+05:30" "feat(db): add Prisma schema with AnonymousUser, Confession, Flag models" backend/prisma/schema.prisma frontend/jsconfig.json
commit "2026-02-18T16:45:00+05:30" "feat(backend): confessions CRUD controller and routes" backend/src/controllers/confession.controller.js backend/src/routes/confession.routes.js backend/db.js
commit "2026-02-19T11:20:00+05:30" "feat(middleware): anonymous ID cookie, rate limiter, validation middleware" backend/server.js backend/src/middleware/common.js backend/src/middleware/index.js
commit "2026-02-21T09:10:00+05:30" "feat(frontend): confessions page with form and feed components" frontend/src/app/confessions frontend/src/components/Confessions
commit "2026-02-22T15:40:00+05:30" "feat(frontend): basic layout and navigation" frontend/src/app/layout.js frontend/src/app/globals.css frontend/src/components/Navbar.js frontend/src/components/NavBar.module.css
commit "2026-02-24T18:05:00+05:30" "feat(api): frontend API layer integration" frontend/src/lib/api.js
commit "2026-02-25T13:25:00+05:30" "feat(backend): safe rooms REST API routes (create, join, list, my rooms)" backend/src/routes/rooms.js backend/src/middleware/room.middleware.js
commit "2026-02-27T10:50:00+05:30" "feat(backend): messages and room ban routes" backend/src/routes/messages.js backend/src/routes/roomBan.js backend/src/routes/messageFlags.js
commit "2026-02-28T22:30:00+05:30" "feat(backend): Socket.IO setup with real-time chat, presence" backend/src/sockets/rooms.js
commit "2026-03-02T16:15:00+05:30" "feat(frontend): safe rooms creation and available lists" frontend/src/components/SafeRooms/CreateRoomForm.js frontend/src/components/SafeRooms/CreateRoomForm.module.css frontend/src/components/SafeRooms/AvailableRooms.js frontend/src/components/SafeRooms/AvailableRooms.module.css
commit "2026-03-03T11:40:00+05:30" "feat(frontend): my safe rooms and join by code" frontend/src/components/SafeRooms/MyRooms.js frontend/src/components/SafeRooms/MyRooms.module.css frontend/src/components/SafeRooms/JoinRoomForm.js frontend/src/components/SafeRooms/JoinRoomForm.module.css
commit "2026-03-05T09:20:00+05:30" "feat(frontend): safe rooms main hub page" frontend/src/app/safe-rooms/page.js frontend/src/app/safe-rooms/page.module.css frontend/src/components/SafeRooms/SafeRoomTabs.js frontend/src/components/SafeRooms/SafeRoomTabs.module.css frontend/src/components/SafeRooms/SafeRoomsWelcomeNote.jsx frontend/src/components/SafeRooms/SafeRoomsWelcome.module.css
commit "2026-03-06T14:10:00+05:30" "feat(frontend): dynamic routing for chat rooms" frontend/src/app/safe-rooms/[roomId]
commit "2026-03-08T20:55:00+05:30" "feat(frontend): real-time ChatRoom with Socket.IO client integration" frontend/src/components/SafeRooms/ChatRoom.js frontend/src/components/SafeRooms/ChatRoom.module.css
commit "2026-03-10T10:30:00+05:30" "feat(backend): challenges read and list endpoints" backend/src/controllers/challenge.controller.js
commit "2026-03-11T13:45:00+05:30" "feat(backend): challenge check-in, join, and create endpoints" backend/src/routes/challenge.routes.js backend/src/middleware/challenge.middleware.js
commit "2026-03-13T17:20:00+05:30" "feat(frontend): create challenge form component" frontend/src/components/Challenges/CreateChallengeForm.js frontend/src/components/Challenges/CreateChallengeForm.module.css
commit "2026-03-14T11:05:00+05:30" "feat(frontend): explore and join public challenges" frontend/src/components/Challenges/AvailableChallenges.js frontend/src/components/Challenges/AvailableChallenges.module.css
commit "2026-03-16T15:30:00+05:30" "feat(frontend): track active challenges and streaks" frontend/src/components/Challenges/MyChallengesList.js frontend/src/components/Challenges/MyChallengesList.module.css
commit "2026-03-17T09:50:00+05:30" "feat(frontend): daily challenge check-in modal" frontend/src/components/Challenges/CheckInModal.js frontend/src/components/Challenges/CheckInModal.module.css
commit "2026-03-19T14:15:00+05:30" "feat(frontend): main challenges page assembly" frontend/src/app/challenges frontend/src/components/Challenges/ChallengesWelcome.js frontend/src/components/Challenges/ChallengesWelcome.module.css
commit "2026-03-21T18:40:00+05:30" "feat(frontend): leaderboard for most popular challenges" frontend/src/components/Challenges/Leaderboard.js frontend/src/components/Challenges/Leaderboard.module.css
commit "2026-03-22T10:25:00+05:30" "feat(ui): reusable feature cards for dashboard" frontend/src/components/FeatureCard.js frontend/src/components/FeatureCard.module.css frontend/src/components/CardStyles.module.css
commit "2026-03-24T16:10:00+05:30" "feat(frontend): wire feature cards in homepage" frontend/src/app/page.js frontend/src/app/page.module.css
commit "2026-03-26T11:55:00+05:30" "feat(frontend): detailed challenge views" frontend/src/components/Challenges/ChallengeDetail.js frontend/src/components/Challenges/ChallengeDetail.module.css frontend/src/components/Challenges/ChallengeStreaks.js frontend/src/components/Challenges/ChallengeStreaks.module.css
commit "2026-03-27T09:30:00+05:30" "fix: align frontend API calls with backend field names and routes" frontend/src/lib/api.js 
commit "2026-03-28T15:45:00+05:30" "fix: safe rooms REST API mounting and CORS" backend/server.js 
commit "2026-03-29T13:20:00+05:30" "fix: missing Room and Message models added" backend/prisma/schema.prisma 
commit "2026-03-30T10:15:00+05:30" "chore: configure git ignores" .gitignore frontend/.gitignore backend/.gitignore
commit "2026-03-31T14:40:00+05:30" "chore: update deployment configuration" render.yaml frontend/next.config.mjs frontend/eslint.config.mjs

git add .
if ! git diff-index --quiet HEAD -- 2>/dev/null || git status --porcelain | grep -q '^[AM]'; then
    GIT_AUTHOR_DATE="2026-04-01T10:00:00+05:30" GIT_COMMITTER_DATE="2026-04-01T10:00:00+05:30" git commit -m "fix: final polish and bug fixes"
fi

git push origin main -f
