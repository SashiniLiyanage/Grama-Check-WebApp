import React, { useEffect } from 'react';
import { SecureRoute, useAuthContext } from "@asgardeo/auth-react";

const ProtectedRoute = ({ path, component }) => {

    const { state, signIn } = useAuthContext();
    
    useEffect(() => {
       console.log("auth", state.isAuthenticated)
       console.log("loading", state.isLoading)
    },[state]);

    return (
        <SecureRoute
            path={path}
            component={ component } 
            callback={ () => {
                signIn();
            }}
        />
    );
};

export default ProtectedRoute;