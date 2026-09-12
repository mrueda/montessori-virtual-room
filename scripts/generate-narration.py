"""Generate the English material introductions with a local Piper voice.

Example:
  python3 scripts/generate-narration.py \
    --python /path/to/piper/venv/bin/python \
    --data-dir /path/to/piper/voices
"""

import argparse
import json
import subprocess
import tempfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "src/content/en/narration.json"


def arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument("--python", required=True, help="Python executable with piper-tts")
    parser.add_argument("--data-dir", required=True, help="Directory containing the voice")
    parser.add_argument("--voice", default="en_US-ljspeech-high")
    parser.add_argument("--force", action="store_true", help="Replace existing MP3 files")
    return parser.parse_args()


def main():
    args = arguments()
    entries = json.loads(MANIFEST.read_text())
    with tempfile.TemporaryDirectory(prefix="montessori-narration-") as temporary:
        temporary_path = Path(temporary)
        for material_id, entry in entries.items():
            wave = temporary_path / f"{material_id}.wav"
            destination = ROOT / "public" / entry["url"]
            destination.parent.mkdir(parents=True, exist_ok=True)
            if destination.exists() and not args.force:
                print(f"kept {destination.relative_to(ROOT)}")
                continue
            subprocess.run(
                [
                    args.python,
                    "-m",
                    "piper",
                    "-m",
                    args.voice,
                    "--data-dir",
                    args.data_dir,
                    "--sentence-silence",
                    "0.2",
                    "-f",
                    str(wave),
                    "--",
                    entry["transcript"],
                ],
                check=True,
                cwd=temporary_path,
            )
            subprocess.run(
                [
                    "ffmpeg",
                    "-loglevel",
                    "error",
                    "-y",
                    "-i",
                    str(wave),
                    "-codec:a",
                    "libmp3lame",
                    "-b:a",
                    "64k",
                    str(destination),
                ],
                check=True,
            )
            print(f"generated {destination.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
