import React from 'react';
import NotFound from '../Assets/404.gif';
import { Button } from '@mui/material';
import { useHistory } from "react-router-dom";

const NotFoundPage = props => {

    let history = useHistory();

    return (
        <div className='App'>
            <div className='fullscreen' style={{flexDirection: "column", background: `url(${NotFound})`, backgroundPosition: 'bottom'}}>
                <Button sx={{position:'absolute', bottom: "25%"}} variant="containedgit" onClick={() => history.goBack()}>Go Back</Button>
            </div>
        </div>
    );
};

export default NotFoundPage;