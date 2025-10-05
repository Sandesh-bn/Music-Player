import { Player } from "./components/Player"
import { Sidebar } from "./components/Sidebar";
import { Display } from "./components/Display";
import { useContext } from "react";
import { useState } from "react";
import { songsData } from "./assets/assets";
import { useEffect } from "react";

function App() {
  console.log("APP");
  console.log(songsData[0])
  const [ currentSong, setCurrentSong ] = useState(songsData[1])

  function updateSong(id){
    setCurrentSong(songsData[id])
  }
  return (
    <div className='h-screen bg-black'>
      <div className='h-[90%] flex'>
        <Sidebar />
        <Display updateSong={updateSong}/>
      </div>
      <Player currentSong={currentSong} setCurrentSong={setCurrentSong}/>
    </div>
  )
}

export default App
