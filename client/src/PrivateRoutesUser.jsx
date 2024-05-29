import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutesUser = () => {
  const userLoggedIn = useSelector((state) => state.auth?.Userisloggedin)
  return <>
    {userLoggedIn ? <Outlet /> : <Navigate to={'/login'} />}
  </>
};
export default PrivateRoutesUser;
