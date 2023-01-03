import * as React from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from "react-router-dom";

import logo from '../Assets/logo.png';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
  }));



const LoginPage = props => {

    const { state, signIn } = useAuthContext();
    const history = useHistory();

    const handleSignIn = ()=>{
        if(state.isAuthenticated){
            history.push("/");
        }else{
            signIn();
        }  
    }

    return (
    <div className="App">
    <div className='Background'>
    <Card sx={{ display: 'flex', width: "50%", backgroundColor: "rgba(255,255,255,0.8)"}}>
        {/* <CardMedia
            component="img"
            sx={{ width: "40%", display: { xs: 'none', md: 'flex' }}}
            image={image}
        /> */}
        <Box sx={{ display: 'flex', flexDirection: 'column',width: { xs: '100%', md: '100%' }}}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <img src={logo} alt="horse" style={{width: "120px", margin:20}}/>
            <Typography component="div" variant="h5">
                Gramasewaka Certificate
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
                Request the certificate from Grama Niladhari of the Residential Division.
            </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1, m:5}}>
                <Root>
                <Button variant="contained" endIcon={<PersonIcon/>}  onClick={handleSignIn}>
                    Get Started
                </Button>
                </Root>              
            </Box>
        </Box>
    </Card>
    </div>
    </div>
    );
};


export default LoginPage;