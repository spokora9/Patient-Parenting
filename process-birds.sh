#!/bin/bash
# Process bird sound files for Parent Architect
# Converts WAV to optimized MP3 files

set -e

echo "🐦 Processing bird sound files..."

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ ffmpeg is not installed. Please install it:"
    echo "   Ubuntu/Debian: sudo apt install ffmpeg"
    echo "   macOS: brew install ffmpeg"
    exit 1
fi

cd "$(dirname "$0")/audio/birds"

# Process Robin (loop the whole file)
if [ -f "XC892933 - American Robin - Turdus migratorius.wav" ]; then
    echo "Processing American Robin..."
    ffmpeg -i "XC892933 - American Robin - Turdus migratorius.wav" \
        -ac 1 \
        -ar 22050 \
        -b:a 64k \
        -y \
        robin-1.mp3

    echo "✓ Created robin-1.mp3"
else
    echo "⚠️  Robin WAV file not found"
fi

# Process Gull (trim to 30 seconds)
if [ -f "XC916971 - Western Gull - Larus occidentalis.wav" ]; then
    echo "Processing Western Gull (trimming to 30s)..."
    ffmpeg -i "XC916971 - Western Gull - Larus occidentalis.wav" \
        -ac 1 \
        -ar 22050 \
        -b:a 64k \
        -ss 0 \
        -t 30 \
        -y \
        gull-1.mp3

    echo "✓ Created gull-1.mp3 (30s loop)"
else
    echo "⚠️  Gull WAV file not found"
fi

echo ""
echo "✅ Done! Processed files:"
ls -lh *.mp3 2>/dev/null || echo "No MP3 files created (WAV files missing)"
echo ""
echo "You can now delete the original WAV files to save space:"
echo "  rm *.wav"
