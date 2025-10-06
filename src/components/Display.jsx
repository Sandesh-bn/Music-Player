import { Home } from "./Home";
import { Route, Routes, useLocation } from 'react-router-dom';
import { AlbumDetails } from "./AlbumDetails";
import { useRef } from 'react';
import { albumsData, songsData } from "../assets/assets";
import { useEffect } from "react";


export function Display({ updateSong }) {
    const bannerRef = useRef(null);
    const currentPage = useLocation(); // gets the current path in pathname attribute
    const isUserOnAlbumPage = currentPage.pathname.includes("album");
    // console.log("CCC");
    // console.log(currentPage)

    function updateBackground(albumPageId){
        const bannerCOlor = albumsData[parseInt(albumPageId)].bgColor;
        bannerRef.current.style.background = `linear-gradient(${bannerCOlor}, #121212)`

    }

    return (
        <div ref={bannerRef} className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0">
            <Routes>
                <Route path="/" element={<Home updateSong={updateSong}  />} />
                <Route path='/album/:id' element={<AlbumDetails updateBackground={updateBackground} updateSong={updateSong} />} />
            </Routes>
        </div>
    )
}