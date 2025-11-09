import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import CD from "../../public/CD.svg";
import '../App.css'; 

const SongSelect = () => {  
  return (
    <>
      <main className="flex flex-col justify-center items-center w-screen h-screen text-[#FFFFFF]">

        <span className="text-3xl">Select a song!</span>

        <Link to="/game" className="cursor-pointer hover:underline">
          Song 1 - Author 1
        </Link>
        
        <Link to="/game" className="cursor-pointer hover:underline">
          Song 2 - Author 2
        </Link>

        <img src={CD} alt="" />

      </main>
    </>
  )
}

export default SongSelect
