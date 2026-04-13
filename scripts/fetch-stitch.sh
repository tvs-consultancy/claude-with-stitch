#!/bin/bash
# Fetch a Stitch asset (HTML or screenshot) handling Google Cloud Storage redirects.
# Usage: bash scripts/fetch-stitch.sh "<url>" "<output_path>"

set -euo pipefail

URL="$1"
OUTPUT="$2"

mkdir -p "$(dirname "$OUTPUT")"

# Follow redirects (-L), fail on HTTP errors (-f), silent with progress (-sS)
curl -L -f -sS -o "$OUTPUT" "$URL"

echo "Downloaded: $OUTPUT ($(wc -c < "$OUTPUT") bytes)"
