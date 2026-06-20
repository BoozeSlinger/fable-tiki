#!/usr/bin/env python3
"""Knock out a flat-background render into a clean alpha PNG cutout.

Usage: cutout.py <input.png> <output.png>
Runs rembg (U2Net) segmentation, trims to the subject bounding box with a
small transparent margin, and writes an RGBA PNG.
"""
import sys
from rembg import remove
from PIL import Image


def main(src: str, dst: str) -> None:
    img = Image.open(src).convert("RGBA")
    out = remove(img)  # RGBA with alpha matte

    # Trim to subject bbox + 3% margin so layout isn't dominated by empty space.
    bbox = out.getbbox()
    if bbox:
        pad_x = int((bbox[2] - bbox[0]) * 0.03)
        pad_y = int((bbox[3] - bbox[1]) * 0.03)
        w, h = out.size
        crop = (
            max(0, bbox[0] - pad_x),
            max(0, bbox[1] - pad_y),
            min(w, bbox[2] + pad_x),
            min(h, bbox[3] + pad_y),
        )
        out = out.crop(crop)

    out.save(dst)
    a = out.getchannel("A")
    lo, hi = a.getextrema()
    print(f"{dst}  size={out.size}  alpha={lo}-{hi}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
