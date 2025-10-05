import { useContext } from "react"
import { assets } from "../assets/assets"
import AudioPlayer from "./AudioPlayer";
export function Player({ currentSong }) {
    console.log("PLayer");
    console.log(currentSong)
    return (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4">
                <img className="w-12" src={currentSong.image} alt="song_Data" />
                <div>
                    <p>{currentSong.name}</p>
                    <p className="">{currentSong.desc.slice(0, 12)}</p>
                </div>
            </div>
            <div className="flex flex-col w-100 items-center gap-1 m-auto">
                <AudioPlayer currentSong={currentSong} />
            </div>

        </div>
    )
}