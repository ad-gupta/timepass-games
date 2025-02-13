import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import GameBox from "./components/GameBox";
import timePass from "./assets/time-pass.webp";
import horrorMystery from "./assets/trending-games.jpg";
import PopupMenu from "./components/PopupMenu";
import axios from 'axios'

const App = () => {
  const [open, setOpen] = useState(false);
  const [isToUpdate, setIsToUpdate] = useState(false)
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setgames] = useState([])

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/v1/');
        setgames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, [isToUpdate]);


  return (
    <div className="bg-black min-h-screen text-white md:px-24">
      <nav className="bg-neutral-800 shadow-neutral-600 text-white shadow-md sticky w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-5">
            <img src={timePass} alt="TIME-PASS" className="h-14 w-14" />
            <div className="max-md:w-56 max-sm:w-42 flex items-center bg-slate-300 text-gray-700 rounded-lg px-3 py-1 w-96">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search games..."
                className="outline-none bg-transparent h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div onClick={() => setOpen(true)} className="text-3xl">
            <IoGameControllerOutline />
          </div>
          {open && (
            <>
              <PopupMenu setOpen={setOpen} setIsToUpdate = {setIsToUpdate}/>
            </>
          )}
        </div>
      </nav>

      <div className="flex justify-between gap-5 py-5 max-md:px-2">
        <div className="w-full">
          {/* Games Grid */}
          <div className="flex flex-col gap-3">
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => <GameBox game={game} open = {open} setOpen = {setOpen} setIsToUpdate = {setIsToUpdate}/>)
            ) : (
              <p className="text-gray-500">No games found.</p>
            )}
          </div>
        </div>
        <div className="max-lg:hidden w-[30%]">
          {" "}
          <img src={horrorMystery} className="h-[130vh]" />{" "}
        </div>
      </div>
    </div>
  );
};

export default App;
