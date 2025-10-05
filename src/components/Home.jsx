import { albumsData, songsData } from "../assets/assets";
import { AlbumCard } from "./AlbumCard";
import { Navbar } from "./Navbar";
import { SongCard } from "./SongCard";

export function Home() {
    return (
        <>
            <Navbar />
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Feature Charts</h1>
                <div className="flex overflow-auto">
                    {albumsData.map((album, index) => (
                        <AlbumCard key={index} id={index} image={album.image} name={album.name} desc={album.desc} />
                    ))}
                </div>

                <h1 className="my-5 font-bold text-2xl">Today's Most Popular Songs</h1>
                <div className="flex overflow-auto">
                    {songsData.map((album, index) => (
                        <SongCard key={index} id={index} image={album.image} name={album.name} desc={album.desc} />
                    ))}
                </div>
            </div>
        </>
    )
}