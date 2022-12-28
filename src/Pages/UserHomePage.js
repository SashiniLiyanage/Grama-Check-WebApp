import { Box, Card, Grid, Switch } from '@mui/material';
import React, { useState } from 'react';
import MenuBar from '../Components/MenuBar';
import NewRequest from './User/NewRequest';
import RequestStatus from './User/RequestStatus';


const UserHome = props => {
    const [requested, setRequested] = useState(false);

    return (
        <>
            <Switch onClick={() => { setRequested(!requested) }} />
            <Grid container padding={5} direction="column" className='HomeBG'>
                {!requested ? <NewRequest /> : <RequestStatus />}
            </Grid>
        </>
    );
};

export default UserHome;