import { Grid } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import NewRequest from './User/NewRequest';
import RequestStatus from './User/RequestStatus';
import { infoContext } from "../Components/DefaultLayout";
import Spinner from '../Components/Spinner';
import axios from 'axios';
import config from '../config.json';


const UserHome = props => {
    const info = useContext(infoContext);
    
    const [requested, setRequested] = useState(false);

    useEffect(()=>{

        console.log(info.NIC);
        axios.get(`${config.url}/request`, {
            headers: {
              Authorization: `Bearer ${info.access_token}`,
              NIC: info.NIC
            }
          })
          .then( (res) => {
            if(res.data.msg !== "No user request with given NIC number"){
                setRequested(true);
            }
          })
          .catch( (err) => {
            console.log(err);
          });
          
    },[info]);


    return (
        (!info.NIC) ?
        <Spinner /> : (
        <>
            <Grid container padding={5} direction="column" className='HomeBG' alignContent='center'>
                {!requested ? <NewRequest requested={requested} setRequested={setRequested} /> : <RequestStatus requested={requested} setRequested={setRequested} />}
            </Grid>
        </>
    ));
};

export default UserHome;