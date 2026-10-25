#!/usr/bin/env bash
# Prepara un clip para animar una foto de la web.
# Uso: scripts/preparar-video.sh <nombre-de-la-foto> <clip-original.mp4> [segundos]
# Ejemplo: scripts/preparar-video.sh despido-caja ~/Descargas/clip.mp4 7
# Genera public/video/paginas/<foto>.webm y .mp4: mudos, en bucle, 960 px de ancho, pocos cientos de KB.
set -euo pipefail
foto="$1"; origen="$2"; seg="${3:-7}"
dest="$(dirname "$0")/../public/video/paginas"; mkdir -p "$dest"
filtro="scale=960:720:force_original_aspect_ratio=increase,crop=960:720,fps=24,format=yuv420p"
ffmpeg -y -loglevel error -i "$origen" -t "$seg" -an -vf "$filtro" -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 "$dest/$foto.webm"
ffmpeg -y -loglevel error -i "$origen" -t "$seg" -an -vf "$filtro" -c:v libx264 -crf 29 -preset slow -movflags +faststart "$dest/$foto.mp4"
ls -la "$dest/$foto".* | awk '{print $5/1024 " KB", $9}'
