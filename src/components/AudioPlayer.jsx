import { useState, useRef, useEffect } from "react";
import Song from '../assets/song1.mp3';
import { assets } from "../assets/assets";

export default function AudioPlayer({ currentSong }) {

    let src = currentSong.file;
    const audioRef = useRef(null);
    const progressRef = useRef(null);
    const animationRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Load metadata once
    useEffect(() => {
        const audio = audioRef.current;
        const handleLoaded = () => setDuration(audio.duration || 0);
        audio.addEventListener("loadedmetadata", handleLoaded);
        return () => audio.removeEventListener("loadedmetadata", handleLoaded);
    }, [src]);

    // Play / Pause logic
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
            cancelAnimationFrame(animationRef.current);
        } else {
            audio.play();
            animationRef.current = requestAnimationFrame(updateProgress);
        }
        setIsPlaying(!isPlaying);
    };

    // Update progress smoothly using requestAnimationFrame
    const updateProgress = () => {
        const audio = audioRef.current;
        if (audio && progressRef.current) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressRef.current.style.width = `${progressPercent}%`;
            setCurrentTime(audio.currentTime);
            if (!audio.paused) {
                animationRef.current = requestAnimationFrame(updateProgress);
            }
        }
    };

    // Seek when clicking progress bar
    const handleSeek = (e) => {
        const audio = audioRef.current;
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * audio.duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
        if (!audio.paused) animationRef.current = requestAnimationFrame(updateProgress);
    };

    // Format seconds → mm:ss
    const formatTime = (secs) => {
        if (isNaN(secs)) return "0:00";
        const minutes = Math.floor(secs / 60);
        const seconds = Math.floor(secs % 60);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="w-full max-w-md bg-gray-900 text-white rounded-2xl p-4 flex items-center gap-4 shadow-lg">

            {/* Player Controls */}
            <div className="flex-1">
                <div
                    className="w-full h-1 bg-gray-700 rounded-full mt-2 cursor-pointer relative"
                    onClick={handleSeek}
                >
                    <div
                        ref={progressRef}
                        className="absolute top-0 left-0 h-1 bg-green-500 rounded-full"
                        style={{ width: "0%" }}
                    ></div>
                </div>

                {/* Time */}
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Play / Pause Button */}
            <button
                onClick={togglePlay}
                className="bg-green-500 hover:bg-green-400 p-3 rounded-full transition"
            >
                {isPlaying ? (
                    // Pause icon
                    <img className="w-4 cursor-pointer" src={assets.pause_icon} />

                ) : (
                    // Play icon
                    <img className="w-4 cursor-pointer" src={assets.play_icon} />

                )}
            </button>

            <audio
                ref={audioRef}
                src={src}
                onEnded={() => {
                    setIsPlaying(false);
                    cancelAnimationFrame(animationRef.current);
                }}
            />
        </div>
    );
}
