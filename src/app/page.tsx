"use client";

import React, { useState, useEffect } from "react";
import ThemeSwitch from "@/components/themeSwitch";
import { toast } from "sonner";
import { generatePassword, updateUrlParams, updateFromUrlParams } from "@/app/passwordAndUrlParamHandler";

export default function Home() {
  const [length, setLength] = useState(16);
  const [min, max] = [1, 128];
  const [password, setPassword] = useState("");
  const [includeSpecial, setIncludeSpecial] = useState(false); // New state variable

  useEffect(() => {
    updateFromUrlParams(setLength, setIncludeSpecial, length, includeSpecial);
    setPassword(generatePassword(includeSpecial, length));
  }, [length, includeSpecial]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = Number(event.target.value);
    setLength(newLength);
    updateUrlParams("length", newLength.toString());
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIncludeSpecial = event.target.checked;
    setIncludeSpecial(newIncludeSpecial);
    updateUrlParams("special", newIncludeSpecial.toString());
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(password)
      .then(() => toast.success("Copied to clipboard!"));
  }

  const generateNewPassword = () => {
    setPassword(generatePassword(includeSpecial, length));
  }

	return (
		<main className="min-h-screen p-8 sm:p-12 md:p-24 bg-gradient-to-tr from-sky-500 to-indigo-500">
			<div className="bg-zinc-50 rounded-xl p-10 space-y-3 text-gray-950 dark:bg-gray-800 dark:text-zinc-50">
				<ThemeSwitch />
				<h1 className="text-center text-3xl font-medium tracking-wide">
					Password Generator
				</h1>
				<div className="w-full rounded-xl p-3 border-2 border-black dark:border-zinc-50 flex leading-3 justify-between space-x-3 bg-zinc-200 dark:bg-gray-700">
					<p className="text-xl font-medium truncate w-full">{password}</p>
          <div className="flex space-x-2">
            <button onClick={copyToClipboard}>
              <i className="fa-regular fa-copy text-xl dark:text-zinc-300"></i>
            </button>
            <button onClick={generateNewPassword}>
              <i className="fa-regular fa-arrows-rotate text-xl dark:text-zinc-300"></i>
            </button>
          </div>
        </div>
        <label className="block text-md font-medium text-gray-700 leading-5 dark:text-zinc-300">
          Password Length
        </label>
        <div className="flex space-x-2">
					<input
						type="number"
						className="block text-sm font-medium- w-20 border-2 border-black dark:border-zinc-50 rounded-xl h-10 text-center bg-zinc-200 dark:bg-gray-700"
						value={length}
						min={min}
						max={max}
						onChange={handleChange}
					/>
					<input
						type="range"
						className="block w-full"
						value={length}
						min={min}
						max={max}
						onChange={handleChange}
					/>
				</div>
				<div className="flex space-x-2 leading-5">
					<label className="block text-md font-medium text-gray-700 leading-5 dark:text-zinc-300">
						{" "}
						Special Characters
					</label>
					<label className="relative inline-flex items-center mb-5 cursor-pointer">
						<input
							type="checkbox"
							value=""
							className="sr-only peer"
							checked={includeSpecial}
							onChange={handleCheckboxChange}
						/>
						<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
					</label>
				</div>
			</div>
		</main>
	);
}
