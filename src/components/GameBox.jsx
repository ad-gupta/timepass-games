import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import PopupMenu from "./PopupMenu";
import axios from "axios";

const GameBox = ({ game, setOpen, setIsToUpdate }) => {
  const [toEdit, setToEdit] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false);

  const deletGame = async () => {
    try {
      await axios.delete(`https://timepass-server.onrender.com/api/v1/${game._id}`);
      setMenuVisible((prev) => !prev);
      setIsToUpdate((prev) => !prev);
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  return (
    <div className="relative w-full sm:items-center md:gap-5 bg-neutral-800 flex max-sm:flex-col p-10 h-96 justify-between rounded-md bg-neutral-800">
      <img
        src={game.gamePic}
        className="sm:w-[40%] max-sm:h-[70%] h-[80%] lg:h-full rounded-lg shadow-neutral-800 shadow-md"
      />
      <div key={game.id} className="p-5 w-full">
        <div className="flex flex-col sm:gap-5">
          <a
            href={game.url}
            className="font-bold sm:text-5xl text-3xl mb-2 text-lime-400"
          >
            {game.title}
          </a>
          <div className="max-md:flex justify-between">
            <p className="text-sm text-gray-400">{game.description}</p>
            <p className="text-sm text-gray-400 text-yellow-300">~{game.author}</p>
          </div>
          <span className="text-slate-200"><span className="font-bold">Published:</span> {game.publishDate}</span>
        </div>
      </div>
      <button
        onClick={() => setMenuVisible(prev => !prev)}
        className="h-fit text-xl absolute top-10 right-10"
      >
        <BsThreeDotsVertical />
      </button>

      {menuVisible && (
        <div className="absolute top-15 right-12 text-center w-24 py-2 bg-black rounded shadow-lg z-10">
          <button
            onClick={() => {
              setToEdit(prev => !prev);
            }}
            className="block w-full text-center p-2 hover:bg-neutral-700"
            >
            Update
          </button>
          <button
            onClick={deletGame}
            className="block w-full text-center p-2 hover:bg-neutral-700"
            >
            Delete
          </button>
        </div>
      )}
      {toEdit && <PopupMenu
        setToEdit= {setToEdit}
        setOpen={setOpen}
        setMenuVisible={setMenuVisible}
        setIsToUpdate={setIsToUpdate}
        data={game}
      />}
    </div>
  );
};

export default GameBox;
