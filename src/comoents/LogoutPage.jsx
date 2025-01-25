import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear authentication tokens or user session data
    localStorage.removeItem('authToken'); // Example: Remove token from localStorage
    sessionStorage.clear(); // Clear session storage if necessary

    // Redirect to login page after logout
    navigate('/account/login');
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-4 bg-white rounded shadow-md">
        <h1 className="text-lg font-bold text-gray-800">Logging Out...</h1>
        <p className="text-gray-600">You are being redirected to the login page.</p>
      </div>
    </div>
  );
};

export default LogoutPage;
