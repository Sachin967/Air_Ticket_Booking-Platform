import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'


const SearchBar = ({ value, onChange, handleSearch }) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-lg'>
      <input
        type="text"
        placeholder="Search Airlines"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
      <FaMagnifyingGlass onClick={handleSearch} className="text-slate-400 cursor-pointer hover:text-black" />
    </div>
  )
}

export default SearchBar