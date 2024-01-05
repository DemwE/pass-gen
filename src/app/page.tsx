'use client';

import React, {useState, useEffect} from 'react';
import {generator} from "@/app/generator";
import {toast} from 'sonner';

export default function Home() {
  const [length, setLength] = useState(16);
  const [min, max] = [1, 128];
  const [password, setPassword] = useState('');
  const [includeSpecial, setIncludeSpecial] = useState(false); // New state variable
  const passgen = generator({special: includeSpecial, length: length});

  useEffect(() => {
    setPassword(passgen);
    const params = new URLSearchParams(window.location.search);
    params.set('length', length.toString());
  }, [length, includeSpecial]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(Number(event.target.value));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncludeSpecial(event.target.checked);
  };

  function Copy() {
    navigator.clipboard.writeText(password).then(toast.success('Copied to clipboard!'));
  }

  return (
    <main className="min-h-screen p-24 bg-gradient-to-tr from-sky-500 to-indigo-500">
      <div className="bg-zinc-50 rounded-xl p-10 space-y-3 text-gray-950">
        <h1 className="text-center text-3xl font-medium tracking-wide">Password Generator</h1>
        <div className="w-full rounded-xl p-3 border-2 border-black flex leading-3 justify-between space-x-3">
          <p className="text-xl font-medium truncate w-full">{password}</p>
          <div className="flex space-x-2">
            <button onClick={() => Copy()}>
              <i className="fa-regular fa-copy text-xl"></i>
            </button>
            <button onClick={() => setPassword(passgen)}>
              <i className="fa-regular fa-arrows-rotate text-xl"></i>
            </button>
          </div>
        </div>
        <label className="block text-md font-medium text-gray-700 leading-5">Password Length</label>
        <div className="flex space-x-2">
          <input
            type="number"
            className="block text-sm font-medium- w-20 border-2 border-black rounded-xl h-10 text-center"
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
          <label className="block text-md font-medium text-gray-700">Include Special Characters</label>
          <input
            type="checkbox"
            className="block"
            checked={includeSpecial}
            onChange={handleCheckboxChange}
          />
        </div>
      </div>
    </main>
  );
}
