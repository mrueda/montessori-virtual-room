import { useEffect, useRef, useState } from "react";
import { Pause, Volume2 } from "lucide-react";

export default function NarrationButton({
  url,
  transcript,
}: {
  url: string;
  transcript: string;
}) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(
    () => () => {
      audio.current?.pause();
      audio.current = null;
    },
    [],
  );

  function toggle() {
    if (!audio.current) {
      const player = new Audio(`${import.meta.env.BASE_URL}${url}`);
      player.addEventListener("ended", () => setPlaying(false));
      player.addEventListener("pause", () => setPlaying(false));
      audio.current = player;
    }
    if (playing) {
      audio.current.pause();
      return;
    }
    void audio.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }

  return (
    <div className="narration-control">
      <button
        className="secondary-button narration-button"
        aria-label={
          playing
            ? "Pause narrated introduction"
            : "Listen to narrated introduction"
        }
        aria-pressed={playing}
        onClick={toggle}
      >
        {playing ? <Pause size={16} /> : <Volume2 size={17} />}
        {playing ? "Pause" : "Listen"}
      </button>
      <details>
        <summary>Read narration transcript</summary>
        <p>{transcript}</p>
      </details>
    </div>
  );
}
