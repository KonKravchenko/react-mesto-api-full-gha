import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, isLoading, ...props  }) => {
  if(isLoading){
    return (
      <div><h1 className='menu__item'>Loading...</h1></div>
    )
  }
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
)}

export default ProtectedRouteElement;