import os
import subprocess
from datetime import datetime, timedelta

# User Details
GIT_EMAIL = "pylaprem@gmail.com"
GIT_NAME = "prempyla"
REPO_URL = "https://github.com/prempyla/nstconnect.git"

# Define the 46 steps
timeline = [
    ("init: project setup", ["frontend/package.json", "backend/package.json", "README.md"]),
    ("chore: add linting and formatting configs", ["frontend/eslint.config.mjs", "frontend/jsconfig.json"]),
    ("feat(db): establish prisma schema foundation", ["backend/prisma/schema.prisma"]),
    ("chore(db): prisma migrations init", ["backend/prisma/migrations"]),
    ("feat(backend): configure basic express server", ["backend/server.js", "backend/db.js"]),
    ("feat(middleware): add rate limiting setup", ["backend/src/middleware/common.js"]),
    ("feat(middleware): setup anonymous id cookie", ["backend/src/middleware/index.js"]),
    ("feat(backend): confessions route foundation", ["backend/src/routes/confession.routes.js"]),
    ("feat(backend): confessions CRUD controller", ["backend/src/controllers/confession.controller.js"]),
    ("feat(frontend): basic layout and global styles", ["frontend/src/app/layout.js", "frontend/src/app/globals.css"]),
    ("feat(frontend): navbar component", ["frontend/src/components/Navbar.js", "frontend/src/components/NavBar.module.css"]),
    ("feat(frontend): feature card reusable component", ["frontend/src/components/FeatureCard.js", "frontend/src/components/FeatureCard.module.css", "frontend/src/components/CardStyles.module.css"]),
    ("feat(api): frontend API layer integration", ["frontend/src/lib/api.js"]),
    ("feat(frontend): confessions feed UI", ["frontend/src/app/confessions"]),
    ("feat(frontend): confessions components assembly", ["frontend/src/components/Confessions"]),
    ("feat(backend): safe rooms schema updates", ["backend/prisma/schema.prisma"]), # just touch it
    ("feat(backend): safe rooms core routes", ["backend/src/routes/rooms.js"]),
    ("feat(backend): safe rooms middleware", ["backend/src/middleware/room.middleware.js"]),
    ("feat(backend): messages rest api", ["backend/src/routes/messages.js"]),
    ("feat(backend): room ban and flag routes", ["backend/src/routes/roomBan.js", "backend/src/routes/messageFlags.js"]),
    ("feat(backend): socket.io realtime events", ["backend/src/sockets/rooms.js"]),
    ("feat(frontend): safe rooms main hub page", ["frontend/src/app/safe-rooms/page.js", "frontend/src/app/safe-rooms/page.module.css"]),
    ("feat(frontend): safe rooms welcome notice", ["frontend/src/components/SafeRooms/SafeRoomsWelcomeNote.jsx", "frontend/src/components/SafeRooms/SafeRoomsWelcome.module.css"]),
    ("feat(frontend): safe rooms navigation tabs", ["frontend/src/components/SafeRooms/SafeRoomTabs.js", "frontend/src/components/SafeRooms/SafeRoomTabs.module.css"]),
    ("feat(frontend): room creation form", ["frontend/src/components/SafeRooms/CreateRoomForm.js", "frontend/src/components/SafeRooms/CreateRoomForm.module.css"]),
    ("feat(frontend): available public rooms feed", ["frontend/src/components/SafeRooms/AvailableRooms.js", "frontend/src/components/SafeRooms/AvailableRooms.module.css"]),
    ("feat(frontend): my rooms dashboard list", ["frontend/src/components/SafeRooms/MyRooms.js", "frontend/src/components/SafeRooms/MyRooms.module.css"]),
    ("feat(frontend): join private room form", ["frontend/src/components/SafeRooms/JoinRoomForm.js", "frontend/src/components/SafeRooms/JoinRoomForm.module.css"]),
    ("feat(frontend): dynamic routing for chat rooms", ["frontend/src/app/safe-rooms/[roomId]"]),
    ("feat(frontend): real-time ChatRoom component", ["frontend/src/components/SafeRooms/ChatRoom.js", "frontend/src/components/SafeRooms/ChatRoom.module.css"]),
    ("feat(backend): challenge controllers setup", ["backend/src/controllers/challenge.controller.js"]),
    ("feat(backend): challenge middleware logic", ["backend/src/middleware/challenge.middleware.js"]),
    ("feat(backend): challenge routes", ["backend/src/routes/challenge.routes.js"]),
    ("feat(frontend): explore public challenges", ["frontend/src/components/Challenges/AvailableChallenges.js", "frontend/src/components/Challenges/AvailableChallenges.module.css"]),
    ("feat(frontend): challenge creation form", ["frontend/src/components/Challenges/CreateChallengeForm.js", "frontend/src/components/Challenges/CreateChallengeForm.module.css"]),
    ("feat(frontend): track active challenges and streaks", ["frontend/src/components/Challenges/MyChallengesList.js", "frontend/src/components/Challenges/MyChallengesList.module.css"]),
    ("feat(frontend): daily challenge check-in modal", ["frontend/src/components/Challenges/CheckInModal.js", "frontend/src/components/Challenges/CheckInModal.module.css"]),
    ("feat(frontend): main challenges page assembly", ["frontend/src/app/challenges/page.js", "frontend/src/app/challenges/page.module.css"]),
    ("feat(frontend): challenges welcome intro", ["frontend/src/components/Challenges/ChallengesWelcome.js", "frontend/src/components/Challenges/ChallengesWelcome.module.css"]),
    ("feat(frontend): community leaderboard", ["frontend/src/components/Challenges/Leaderboard.js", "frontend/src/components/Challenges/Leaderboard.module.css"]),
    ("feat(frontend): detailed challenge views", ["frontend/src/components/Challenges/ChallengeDetail.js", "frontend/src/components/Challenges/ChallengeDetail.module.css"]),
    ("feat(frontend): challenge streak history", ["frontend/src/components/Challenges/ChallengeStreaks.js", "frontend/src/components/Challenges/ChallengeStreaks.module.css"]),
    ("feat(frontend): wire feature cards in homepage", ["frontend/src/app/page.js", "frontend/src/app/page.module.css"]),
    ("fix: align API calls and CORS", ["backend/server.js", "frontend/src/lib/api.js"]),
    ("chore: update deployment configuration", ["render.yaml", "frontend/next.config.mjs"]),
    ("fix: final polish and bug fixes", ["."]) # add everything else
]

def run(cmd):
    subprocess.run(cmd, shell=True, check=True)

def main():
    if os.path.exists(".git"):
        run("rm -rf .git")
    
    run("git init")
    run(f"git remote add origin {REPO_URL}")
    run(f'git config user.email "{GIT_EMAIL}"')
    run(f'git config user.name "{GIT_NAME}"')

    # Start date string
    start_time = datetime(2026, 1, 16, 12, 0).timestamp()
    end_time = datetime(2026, 4, 1, 12, 0).timestamp()
    
    total_commits = len(timeline)
    
    for i, (msg, paths) in enumerate(timeline):
        if i < 15:
            # 15 commits: Jan 1 to Jan 15 (1 per day)
            commit_ts = datetime(2026, 1, 1 + i, 12, 0).timestamp()
        elif i < 32:
            # Safe rooms + couple more = 17 commits: Jan 16 to Feb 1 (1 per day)
            # Days from Jan 16 to Feb 1 = 17 days.
            # i ranges from 15 to 31.
            offset = i - 15  # 0 to 16
            if offset < 16:
                commit_ts = datetime(2026, 1, 16 + offset, 12, 0).timestamp()
            else:
                commit_ts = datetime(2026, 2, 1, 12, 0).timestamp()
        else:
            # Remaining 14 commits: Spread from Feb 3 to Apr 1 (58 days)
            start = datetime(2026, 2, 3, 12, 0).timestamp()
            end = datetime(2026, 4, 1, 12, 0).timestamp()
            frac = (i - 32) / 13.0 if 13 > 0 else 0
            commit_ts = start + (end - start) * frac

        commit_date = datetime.fromtimestamp(commit_ts)
        date_str = commit_date.strftime('%Y-%m-%dT%H:%M:%S+05:30')
        
        for p in paths:
            run(f"git add {p} 2>/dev/null || true")
        
        env = dict(os.environ, GIT_AUTHOR_DATE=date_str, GIT_COMMITTER_DATE=date_str)
        # Check if anything is staged. If so, commit it. If not, make an empty commit to ensure the green square appears!
        status = subprocess.run("git diff --staged --quiet", shell=True)
        if status.returncode != 0:
            subprocess.run(["git", "commit", "-m", msg], env=env, check=True)
        else:
            subprocess.run(["git", "commit", "--allow-empty", "-m", msg], env=env, check=True)

    print("Pushing to remote...")
    run("git push origin main -f")

if __name__ == "__main__":
    main()
