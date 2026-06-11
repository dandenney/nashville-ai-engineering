#!/usr/bin/env bash
set -euo pipefail

cd /Users/clawfather/Projects/nashville-ai-engineering

node scripts/meetup-sync.mjs --write --quiet

if git diff --quiet -- src/data/events.ts; then
  exit 0
fi

npm run test:node >/tmp/nashville-ai-engineering-meetup-sync.test.log 2>&1
npm run build >/tmp/nashville-ai-engineering-meetup-sync.build.log 2>&1

git add src/data/events.ts
git commit -m "chore: sync meetup events" >/tmp/nashville-ai-engineering-meetup-sync.commit.log 2>&1
git push origin main >/tmp/nashville-ai-engineering-meetup-sync.push.log 2>&1

commit_sha=$(git rev-parse --short HEAD)
summary=$(git show --stat --oneline --no-patch HEAD)
current_event=$(python - <<'PY'
from pathlib import Path
import re
text = Path('src/data/events.ts').read_text()
m = re.search(r"currentRSVPs: (\d+),\n\s+registrationUrl: 'https://www\.meetup\.com/artificialintelligencers/events/(\d+)/'", text)
if m:
    print(f"event {m.group(2)} RSVP count now {m.group(1)}")
PY
)

echo "Meetup sync pushed: ${commit_sha}"
echo "$summary"
if [[ -n "${current_event}" ]]; then
  echo "$current_event"
fi
