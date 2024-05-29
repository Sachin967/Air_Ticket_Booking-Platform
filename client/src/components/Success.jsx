import React from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();

  if (!location.state || !location.state.fromNavigation) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg mb-4">Thank you for your payment. Your booking is confirmed.</p>
        <Link to="/" className="text-blue-600 hover:underline">Return to Home Page</Link>
      </div>
    </div>
  );
};

export default Success;
