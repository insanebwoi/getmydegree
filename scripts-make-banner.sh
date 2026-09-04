#!/bin/bash
# Compress a source image into the universities page banner.
#   ./scripts-make-banner.sh ~/Downloads/banner.png
# Matches the other page banners: 1600px wide, WebP, roughly 35-50KB.
set -e
SRC="$1"
[ -f "$SRC" ] || { echo "usage: $0 <image file>"; exit 1; }
OUT=public/images/universities/universities-banner.webp
TMP=$(mktemp -t banner).png
sips -Z 1600 "$SRC" --out "$TMP" >/dev/null
for q in 82 76 70 64; do
  cwebp -q $q -m 6 "$TMP" -o "$OUT" >/dev/null 2>&1
  KB=$(( $(stat -f%z "$OUT") / 1024 ))
  echo "q=$q -> ${KB}KB"
  [ "$KB" -le 55 ] && break
done
rm -f "$TMP"
sips -g pixelWidth -g pixelHeight "$OUT" | tail -2 | tr -d '\n'; echo
echo "written: $OUT ($(( $(stat -f%z "$OUT") / 1024 ))KB)"
