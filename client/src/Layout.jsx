import React from "react";
import Navbar from "../src/components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { searchFlightsByName } from "./api/flights";

const Layout = () => {
  const navigate = useNavigate()
  const onSearch = async (query) => {
    try {
      if (query) {
        if(location.pathname!=='/search-results'){
          navigate('/search-results', { state: { airline: query } });
        }else{
          navigate(location.pathname, { state: { airline: query } });
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={onSearch} />
      <Outlet />
    </div>
  );
};

export default Layout
