import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import MenuBar from '../Components/MenuBar';
import UserHome from './UserHome';
import GramaSewakaPortal from './GramaSewakaPortal';

const HomePage = props => {

    const { state, signIn, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
    const [group, setGroup] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {
            const basicUserInfo = await getBasicUserInfo();
            const idToken = await getIDToken();
            const decodedIDToken = await getDecodedIDToken();

            if(basicUserInfo.groups){
                setLoading(false);
                setGroup(true);
            }
        })();

        
    }, []);

      
    return (
        <>
        <MenuBar/>
        </>
        
    );
};

export default HomePage;