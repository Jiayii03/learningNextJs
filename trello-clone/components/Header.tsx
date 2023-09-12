"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";
import { Switch } from "@headlessui/react";

function Header() {
  const [board, searchString, setSearchString, darkMode, setDarkMode] =
    useBoardStore((state) => [
      state.board,
      state.searchString,
      state.setSearchString,
      state.darkMode,
      state.setDarkMode,
    ]);

  const [loading, setLoading] = useState<boolean>(false);
  const [suggestion, setSuggestion] = useState<string>("");

  // useEffect(() => {
  //   if (board.columns.size === 0) return; // board.columns is a map, so use size
  //   setLoading(true);

  //   const fetchSuggestionFunc = async () => {
  //     const suggestion = await fetchSuggestion(board);
  //     setSuggestion(suggestion);
  //     setLoading(false);
  //   };

  //   fetchSuggestionFunc();
  // }, [board]);

  return (
    <header>
      <div className={`${darkMode ? "bg-gray-900/60" : "bg-gray-500/10"} flex flex-col md:flex-row items-center p-5  rounded-b-2xl`}>
        {/* 10% opacity */}

        {/* To add a gradient background, using a hidden div with z-index*/}
        <div
          className={`${
            darkMode
              ? "from-[#000000] to-[#404650] blur-3xl rounded-md"
              : "from-pink-400 to-[#0055D1] opacity-50 rounded-md blur-3xl"
          } absolute top-0 left-0 w-full h-96 bg-gradient-to-br  filter -z-50 `}
        />

        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* Search box */}
          <form
            action=""
            className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            {/* flex-1 means take up the maximum space*/}
            <button hidden type="submit">
              Search
            </button>
          </form>

          {/* Avatar */}
          <Avatar name="Jia Yi" round color="#0055D1" size="50" />

          <Switch
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className={`${
              darkMode ? "bg-blue-600" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                darkMode ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
      </div>

      {/* make child element inside a div center by using flex justify-center */}
      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm font-light shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1] p-5">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1 ${
              loading && "animate-spin"
            }`}
          />
          {/* {suggestion && !loading ? suggestion : "GPT is summarsing your tasks for the day..."} */}
          GPT is summarising your tasks for the day...
        </p>
      </div>
    </header>
  );
}

export default Header;
