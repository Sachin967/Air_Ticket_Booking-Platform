import { IoLogOut } from 'react-icons/io5'
import { adminlogout } from '../../api/auth'
import { AdminActions } from '../../store/Adminauthslice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminNav = () => {
     const { adminDetails } = useSelector((state) => state.admin)
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const handleLogout = async () => {
          try {
               const response = await adminlogout()
              
               if (response) {
                    dispatch(AdminActions.AdminLogout())
                    navigate('/admin/login')
               }
          } catch (error) {
               toast.error(error.message)
          }
     }
     return (
          <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow-xl">
               <h2 className="text-xl font-medium text-black py-2">Admin</h2>

               <div className="flex text-center items-center gap-3">
                    <div className="flex items-center gap-2">
                         <p className="text-lg font-medium">{adminDetails?.email}</p>
                         <button className="bg-red-400 rounded-lg p-1" onClick={handleLogout}>
                              <IoLogOut />
                         </button>
                    </div>
               </div>
          </div>
     )
}
export default AdminNav
