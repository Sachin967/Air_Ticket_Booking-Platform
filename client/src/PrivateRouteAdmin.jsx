import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutesAdmin = () => {
  const { Adminisloggedin } = useSelector((state) => state.admin)
  return (
    <>
      {Adminisloggedin ? <Outlet /> : <Navigate to={'/admin/login'} />}
    </>
  );
};

export default PrivateRoutesAdmin;
