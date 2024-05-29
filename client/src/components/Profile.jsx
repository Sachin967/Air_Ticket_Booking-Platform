import React from 'react'
import { useSelector } from 'react-redux'
import { IoLogOut } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Profile = ({ handleLogout }) => {
  const { userdetails, Userisloggedin } = useSelector((state) => state.auth)
  const Navigate =  useNavigate()
  return (
    <div className="flex text-center items-center gap-3">
      <div>
        {!Userisloggedin ? (
          <>
            <button onClick={()=>Navigate('/login')} className="p-1 m-2 rounded-md bg-green-200">Login</button>
            <button onClick={() => Navigate('/register')} className="p-1 m-2 rounded-md bg-blue-200">Register</button>
          </>
        ) : (
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium">{userdetails?.name}</p>
              <button className="bg-red-400 rounded-lg p-1" onClick={handleLogout}>
                <IoLogOut />
              </button>
            </div>
        )}
      </div>
    </div>
  )
}

export default Profile
