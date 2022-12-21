import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import UserHome from './UserHome';
import GramaSewakaPortal from './GramaSewakaPortal';
import MenuBar from '../Components/MenuBar'

const HomePage = props => {

    const { state, signIn, signOut, getBasicUserInfo, getIDToken, getDecodedIDToken } = useAuthContext();
    const [group, setGroup] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        (async () => {
            const basicUserInfo = await getBasicUserInfo();
            const idToken = await getIDToken();
            const decodedIDToken = await getDecodedIDToken();

            setLoading(false);

            if(basicUserInfo.groups){
                setGroup(true)
            }
        })();

        
    }, []);

      
    return (
        loading?(<div className="App"><div className='fullscreen'><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div></div>):(
        <>
            <MenuBar />
            {!group?(<GramaSewakaPortal/>):(<UserHome/>)}
        </>
        )
    );
};

export default HomePage;