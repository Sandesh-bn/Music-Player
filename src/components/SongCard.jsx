import { useContext } from "react"

export function SongCard({ name, image, desc, id, updateSong}){
    return(
        <div onClick={()=>updateSong(id)} className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]">
            <img className="rounded" src={image}/>
            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm">{desc}</p>
        </div>
    )
}