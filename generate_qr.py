#!/usr/bin/env python3
"""Generate a local QR-code image for the meetup website.

Usage:
    python3 generate_qr.py "https://example.com/form" assets/application-qr.png
"""

from __future__ import annotations

import argparse
from pathlib import Path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate a PNG QR code for an RSVP, speaker-application, or contact URL."
    )
    parser.add_argument("target", help="URL or mailto: address encoded in the QR code")
    parser.add_argument(
        "output",
        nargs="?",
        default="assets/application-qr.png",
        help="Output PNG path (default: assets/application-qr.png)",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()

    try:
        import qrcode
        from qrcode.constants import ERROR_CORRECT_M
    except ImportError as exc:
        raise SystemExit(
            'Missing dependency. Install it with: pip install "qrcode[pil]"'
        ) from exc

    output = Path(args.output).expanduser().resolve()
    output.parent.mkdir(parents=True, exist_ok=True)

    qr = qrcode.QRCode(
        version=None,
        error_correction=ERROR_CORRECT_M,
        box_size=12,
        border=4,
    )
    qr.add_data(args.target)
    qr.make(fit=True)
    image = qr.make_image(fill_color="black", back_color="white")
    image.save(output)

    print(f"Created: {output}")
    print(f"Encoded: {args.target}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
