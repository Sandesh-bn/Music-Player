import { useState, useRef, useEffect } from "react";
import Song from '../assets/song1.mp3';
import { assets } from "../assets/assets";
export default function AudioPlayer({ src, title, artist, cover }) {
  src = Song;
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Toggle play/pause
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress bar as song plays
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress((audio.currentTime / audio.duration) * 100);
      setDuration(audio.duration);
    }
  };

  // Handle manual progress bar seek
  const handleSeek = (e) => {
    const audio = audioRef.current;
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const newTime = (clickX / width) * audio.duration;
    audio.currentTime = newTime;
  };

  // Format seconds → mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs)) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-full max-w-md text-white rounded-2xl p-4 flex items-center gap-4 shadow-lg">
      {/* Player Controls */}
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-gray-400">{artist}</p>

        {/* Progress Bar */}
        <div
          className="w-full h-1 bg-gray-700 rounded-full mt-2 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-1 bg-green-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Time */}
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime((progress / 100) * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play / Pause Button */}
      <button
        onClick={togglePlay}
      >
        {isPlaying ? (
          <img className="w-4 cursor-pointer" src={assets.pause_icon}/>
        ) : (
            <img className="w-4 cursor-pointer" src={assets.play_icon}/>

        )}
      </button>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
}
