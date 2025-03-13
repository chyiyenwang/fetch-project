'use client';

import { searchByBreed } from '@/actions'

interface InputProps {
  inputValue: string;
  suggestions: string[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  inputValue,
  handleInputChange,
}: InputProps) {
  return (
    <form action={searchByBreed} autoComplete="off">
      <div className="focus-within:ring-2 focus-within:ring-blue-400 w-full flex justify-between rounded-full shadow-lg bg-white border transition-all duration-200 ease-in-out">
        <input
          className="outline-none rounded-full p-4 text-lg"
          name="breeds"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="bg-blue-400 text-white m-1 font-medium px-6 py-3 rounded-full hover:bg-blue-500">Search</button>
      </div>
    </form>
  )
};