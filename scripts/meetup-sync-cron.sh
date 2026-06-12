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
changed_events=$(python - <<'PY'
from pathlib import Path
import re
import subprocess

source_path = Path('src/data/events.ts')
lines = source_path.read_text().splitlines()
diff = subprocess.check_output(
    ['git', 'diff', '--unified=0', 'HEAD^', 'HEAD', '--', str(source_path)],
    text=True,
)

changed_line_numbers = set()
for old_start, old_len, new_start, new_len in re.findall(
    r'^@@ -(?P<old_start>\d+)(?:,(?P<old_len>\d+))? \+(?P<new_start>\d+)(?:,(?P<new_len>\d+))? @@',
    diff,
    re.M,
):
    new_start = int(new_start)
    new_len = int(new_len or '1')
    changed_line_numbers.update(range(new_start, new_start + new_len))

event_ids = []
for line_number in sorted(changed_line_numbers):
    idx = min(max(line_number - 1, 0), len(lines) - 1)
    while idx >= 0:
        match = re.search(r"id: '([^']+)'", lines[idx])
        if match:
            event_id = match.group(1)
            if event_id not in event_ids:
                event_ids.append(event_id)
            break
        idx -= 1

for event_id in event_ids:
    block_match = re.search(
        rf"id: '{re.escape(event_id)}',[\s\S]*?currentRSVPs: (\d+),[\s\S]*?registrationUrl: '[^']+'",
        source_path.read_text(),
    )
    if block_match:
        print(f"event {event_id} RSVP count now {block_match.group(1)}")
PY
)

echo "Meetup sync pushed: ${commit_sha}"
echo "$summary"
if [[ -n "${changed_events}" ]]; then
  echo "$changed_events"
fi
