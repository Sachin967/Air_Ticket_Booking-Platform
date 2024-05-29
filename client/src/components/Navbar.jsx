import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Profile from './Profile'
import SearchBar from './SearchBar'
import { useDispatch } from 'react-redux'
import { AuthActions } from '../store/Authslice'
import { toast } from 'react-toastify'
import { logout } from '../api/auth'

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery)
    }
  }
  const handleLogout = async() => {
   try {
    const response = await logout()
    if(response){
      dispatch(AuthActions.UserLogout())
      navigate('/login')
    }
   } catch (error) {
     toast.error(error.message)
   }
  }

  return (
      <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-xl">
        <Link to={'/'}>
        <h2 className="text-xl font-medium text-black py-2">AirBook</h2></Link>
        <SearchBar
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          handleSearch={handleSearch}
        />
        <Profile handleLogout={handleLogout} />
      </div>
  )
}

export default Navbar