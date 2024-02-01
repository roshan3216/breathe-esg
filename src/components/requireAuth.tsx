import React from 'react'
import { Navigate } from 'react-router-dom';

type RequireAuthProps = {
    children: React.ReactNode,
}


const RequireAuth: React.FC<RequireAuthProps> = ({children}) => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken){
        return <Navigate to = '/' />;
    }

    return <>{children}</>;
}

export default RequireAuth;