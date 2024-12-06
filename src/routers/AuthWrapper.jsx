import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthWrapper = (WrappedComponent) => {
  return (props) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log("No token found, redirecting to login");
      return <Navigate to="/login" replace />;
    }

    console.log("Token found, rendering component");
    return <WrappedComponent {...props} />;
  };
};

export default AuthWrapper;
