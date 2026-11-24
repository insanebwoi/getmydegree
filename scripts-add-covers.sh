#!/bin/bash
# Turns finished thumbnail images into blog covers, in every size the site
# serves.
#
#   ./scripts-add-covers.sh ~/Downloads/thumbs/*.png      add or replace covers
#   ./scripts-add-covers.sh --recompress                  redo every existing cover
#
# Name each new file by its number in the B.Tech run (01.png … 30.png, which
# is day 63 … 92 of src/data/postSchedule.ts) or by the article slug
# (online-bca-kerala.png).
#
# For each cover it writes, into public/images/covers (or wherever the cover
# already lives, for --recompress):
#   <slug>.webp        full size, up to 1600 wide: the article header
#   <slug>.w960.webp   960 wide: phones and blog cards on high-density screens
#   <slug>.w480.webp   480 wide: blog cards and sidebar thumbnails
#   <slug>.jpg         1200 wide: WhatsApp / Facebook / LinkedIn link previews
# The page picks the right width itself through srcset, so a phone or a
# thumbnail never downloads the full-size file. Covers are cropped to 16:9.
set -e
cd "$(dirname "$0")"
SCHEDULE=src/data/postSchedule.ts
COVERS=public/images/covers
[ $# -gt 0 ] || { echo "usage: $0 <image> [image …]  |  $0 --recompress"; exit 1; }

TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

slug_for() {
  local name="$1"
  if [[ "$name" =~ ^[0-9]+$ ]]; then
    local day=$((10#$name + 62))
    grep -A1 "day: $day," "$SCHEDULE" | sed -n "s/.*slug: '\(.*\)',/\1/p"
  elif [ -f "src/content/posts/$name.md" ]; then
    echo "$name"
  fi
}

kb() { echo $(( $(stat -f%z "$1") / 1024 )); }

# make_cover <source image> <output directory> <base name>
make_cover() {
  local SRC="$1" DIR="$2" BASE="$3"
  local W H
  W=$(sips -g pixelWidth "$SRC" | awk '/pixelWidth/{print $2}')
  H=$(sips -g pixelHeight "$SRC" | awk '/pixelHeight/{print $2}')

  # Fill 16:9 at up to 1600 wide without enlarging, trimming the overflow evenly.
  local TW=$(( W < 1600 ? W : 1600 ))
  local TH=$(( TW * 9 / 16 ))
  if [ $((W * 9)) -gt $((H * 16)) ]; then
    sips -s format png --resampleHeight "$TH" "$SRC" --out "$TMP/a.png" >/dev/null
  else
    sips -s format png --resampleWidth "$TW" "$SRC" --out "$TMP/a.png" >/dev/null
  fi
  sips -c "$TH" "$TW" "$TMP/a.png" --out "$TMP/full.png" >/dev/null

  cwebp -q 75 -m 6 -sharp_yuv "$TMP/full.png" -o "$DIR/$BASE.webp" >/dev/null 2>&1
  sips --resampleWidth 960 "$TMP/full.png" --out "$TMP/960.png" >/dev/null
  cwebp -q 74 -m 6 -sharp_yuv "$TMP/960.png" -o "$DIR/$BASE.w960.webp" >/dev/null 2>&1
  sips --resampleWidth 480 "$TMP/full.png" --out "$TMP/480.png" >/dev/null
  cwebp -q 72 -m 6 -sharp_yuv "$TMP/480.png" -o "$DIR/$BASE.w480.webp" >/dev/null 2>&1
  sips --resampleWidth 1200 "$TMP/full.png" --out "$TMP/1200.png" >/dev/null
  sips -s format jpeg -s formatOptions 68 "$TMP/1200.png" --out "$DIR/$BASE.jpg" >/dev/null

  echo "cover: $BASE  full $(kb "$DIR/$BASE.webp")KB · 960 $(kb "$DIR/$BASE.w960.webp")KB · 480 $(kb "$DIR/$BASE.w480.webp")KB · preview $(kb "$DIR/$BASE.jpg")KB"
}

if [ "$1" = "--recompress" ]; then
  # Every cover with a JPEG original, plus the two article images that were
  # only ever a JPEG. The JPEG is copied aside first, since it is rewritten.
  for JPG in "$COVERS"/*.jpg public/images/blog/get-my-degree-official-guide.jpg public/images/blog/get-my-degree-reviews-validity-guide.jpg; do
    [ -f "$JPG" ] || continue
    BASE=$(basename "$JPG" .jpg)
    cp "$JPG" "$TMP/source.jpg"
    make_cover "$TMP/source.jpg" "$(dirname "$JPG")" "$BASE"
  done
  exit 0
fi

for SRC in "$@"; do
  [ -f "$SRC" ] || { echo "skip: $SRC (not a file)"; continue; }
  NAME=$(basename "$SRC"); NAME="${NAME%.*}"
  SLUG=$(slug_for "$NAME")
  [ -n "$SLUG" ] || { echo "skip: $SRC (no article for \"$NAME\")"; continue; }
  make_cover "$SRC" "$COVERS" "$SLUG"
done
