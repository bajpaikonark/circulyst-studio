#!/usr/bin/env bash
# Usage: host_reel.sh <local.mp4> <CODE>  -> prints the public https URL of the hosted reel.
# Deploys a static folder to the circulyst-reels Vercel project using $VERCEL_TOKEN.
set -euo pipefail
[ -n "${VERCEL_TOKEN:-}" ] || { echo "VERCEL_TOKEN missing" >&2; exit 2; }
src="$1"; code="$2"; dir="$(mktemp -d)"
tok="$(printf %s "$VERCEL_TOKEN" | tr -d '<>"[:space:]')"
mkdir -p "$dir/public"; cp "$src" "$dir/public/$code.mp4"
printf '{"version":2,"outputDirectory":"public","framework":null,"buildCommand":""}' > "$dir/vercel.json"
(cd "$dir" && VERCEL_ORG_ID=team_ttkFvwDBuVoFpKFGiMiqHDpF VERCEL_PROJECT_ID=prj_6Bge40AxuWr9kDdQS5vdgDm4QoON \
  npx --yes vercel@latest deploy --prod --yes --token "$tok" >&2)
u="https://circulyst-reels.vercel.app/$code.mp4"
# This sandbox cannot reach *.vercel.app; vidiq_video_upload is the reachability check.
echo "$u"
