#!/usr/bin/env bash
# Publish the built Angular app to the gh-pages branch by force-pushing the
# contents of dist/<project>/browser/ as a single orphan commit.
#
# Designed to run in two contexts:
#   1. GitHub Actions: GH_REPO and GITHUB_TOKEN env vars are set.
#      The remote URL is rewritten to use the token so `git push` is non-interactive.
#   2. Locally: pass --remote <git-url> (defaults to `origin`).
#      `git push --force` uses whatever credential helper / SSH config you have.
#
# Usage:
#   scripts/publish-gh-pages.sh                # auto-detect (CI vs local)
#   scripts/publish-gh-pages.sh --remote <url> # force a specific remote URL
#   scripts/publish-gh-pages.sh --dry-run      # show what would happen, no push
#
# Env vars:
#   GH_REPO          - "owner/repo" (required in CI, e.g. from github.repository)
#   GITHUB_TOKEN     - token with `contents: write` (required in CI)
#   DIST_DIR         - source directory to publish (default: dist/worship-service-program/browser)
#   GH_PAGES_BRANCH  - target branch (default: gh-pages)
#   COMMIT_MESSAGE   - commit message (default: "publish: <ISO timestamp>")

set -euo pipefail

# --- arg parsing -------------------------------------------------------------
REMOTE_URL=""
DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --remote)   REMOTE_URL="$2"; shift 2 ;;
    --dry-run)  DRY_RUN=true; shift ;;
    -h|--help)
      sed -n '2,17p' "$0"
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      exit 1
      ;;
  esac
done

# --- config ------------------------------------------------------------------
DIST_DIR="${DIST_DIR:-dist/worship-service-program/browser}"
GH_PAGES_BRANCH="${GH_PAGES_BRANCH:-gh-pages}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-publish: $(date -u +%Y-%m-%dT%H:%M:%SZ)}"

if [[ ! -d "$DIST_DIR" ]]; then
  echo "Error: $DIST_DIR does not exist. Run \`npm run build\` first." >&2
  exit 1
fi

# --- figure out the remote URL ----------------------------------------------
if [[ -z "$REMOTE_URL" ]]; then
  if [[ -n "${GH_REPO:-}" && -n "${GITHUB_TOKEN:-}" ]]; then
    # CI: use token-based HTTPS URL so push is non-interactive.
    REMOTE_URL="https://x-access-token:${GITHUB_TOKEN}@github.com/${GH_REPO}.git"
  else
    # Local: require explicit --remote to avoid accidentally pushing to the
    # wrong place (e.g. when you've got multiple remotes configured).
    echo "Error: --remote <git-url> is required when not running in CI." >&2
    echo "  Example: scripts/publish-gh-pages.sh --remote git@github.com:you/repo.git" >&2
    exit 1
  fi
fi

# --- do the publish ----------------------------------------------------------
WORK=$(mktemp -d)
trap 'rm -rf "$WORK"' EXIT

echo "→ Copying $DIST_DIR to a clean staging directory..."
cp -r "$DIST_DIR"/. "$WORK"/

cd "$WORK"
git init --quiet --initial-branch="$GH_PAGES_BRANCH"
git checkout --quiet --orphan "$GH_PAGES_BRANCH"
git config user.name  "${GIT_AUTHOR_NAME:-worship-service-program-bot}"
git config user.email "${GIT_AUTHOR_EMAIL:-bot@users.noreply.github.com}"

# Make sure GH Pages can serve an index.html even if the SPA ever routes to a
# non-root URL.
if [[ ! -f index.html ]] && [[ -f 404.html ]]; then
  cp 404.html index.html
fi

git add .
git commit --quiet -m "$COMMIT_MESSAGE"

# Pretty-print every file that will be (or was) published.
print_tree() {
  local total=0
  echo "→ Files to be published:"
  while IFS= read -r -d '' file; do
    local size
    size=$(stat -c %s "$file")
    total=$((total + size))
    printf '   %8d  %s\n' "$size" "${file#./}"
  done < <(find . -type f -not -path './.git/*' -print0 | sort -z)
  printf '   --------\n   %8d  total bytes (%d files)\n' "$total" \
    "$(find . -type f -not -path './.git/*' | wc -l)"
}

print_tree

if $DRY_RUN; then
  echo "✓ Dry run complete. Skipping push."
  git log --oneline
  exit 0
fi

echo "→ Force-pushing $GH_PAGES_BRANCH to $REMOTE_URL ..."
git push --quiet --force "$REMOTE_URL" "$GH_PAGES_BRANCH"
echo "✓ Published to $GH_PAGES_BRANCH"
