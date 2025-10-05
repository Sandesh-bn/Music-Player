
import { useState } from "react";
import { createContext, useRef } from "react";
import { songsData } from "../assets/assets";
import { useEffect } from "react";

export const PlayerContext = createContext();

export function PlayerContextProvider(props) {
    const audioPlayerRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    async function playWithId(id){
        await setTrack(songsData[id]);
        await audioPlayerRef.current.play();
        setPlayStatus(true);
    }

    async function playPrevious(){
        if (track.id > 0){
            await setTrack(songsData[track.id - 1])
            await audioPlayerRef.current.play();
            setPlayStatus(true);
        }
    }

    async function playNext(){
        if (track.id < songsData.length - 1){
            await setTrack(songsData[track.id + 1])
            await audioPlayerRef.current.play();
            setPlayStatus(true);
        }
    }

    async function seekSong(e){
        
    }

    useEffect(() => {
        setTimeout(() => {
            audioPlayerRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioPlayerRef.current.currentTime / audioPlayerRef.current.duration) * 100) + "%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioPlayerRef.current.currentTime % 60),
                        minute: Math.floor(audioPlayerRef.current.currentTime / 60)
                    },
                    totalTime: {
                        second: Math.floor(audioPlayerRef.current.duration % 60),
                        minute: Math.floor(audioPlayerRef.current.duration / 60)
                    }
                })
            }
        }, 1000)
    }, [audioPlayerRef])

    function play() {
        audioPlayerRef.current.play();
        setPlayStatus(true);
    }

    function pause() {
        audioPlayerRef.current.pause();
        setPlayStatus(false);
    }

    function stop() {
        audioPlayerRef.current.stop();
        setPlayStatus(false)
    }



    const contextValue = {
        audioPlayerRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        stop,
        playWithId,
        playPrevious,
        playNext,
        seekSong
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}