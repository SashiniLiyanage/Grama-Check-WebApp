import * as React from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import { useHistory } from "react-router-dom";

import image from '../Assets/upanna.jpg';
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
            history.push("/home");
        }else{
            signIn();
        }  
    }

    return (
    <div className="App">
    <div className='Background'>
    <Card sx={{ display: 'flex', width: "75%", maxHeight: "90%"}}>
        <CardMedia
            component="img"
            sx={{ width: "40%"}}
            image={image}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column',width: "60%" }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
            <img src={logo} alt="horse" style={{width: "120px"}}/>
            <Typography component="div" variant="h5">
                Gramasewaka Certificate
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec placerat molestie magna eget sodales. Donec euismod venenatis tincidunt. Nullam id gravida nisi. Vestibulum eget luctus erat. Quisque ex arcu, semper eget ultrices a, faucibus nec est. Quisque aliquet ipsum at arcu sodales interdum. Aliquam sed urna libero. Proin nulla erat, vestibulum at dolor nec, feugiat ullamcorper dui. Donec at urna sapien. Duis cursus, urna in imperdiet tincidunt, odio nulla pretium lacus, et interdum risus magna et magna.
            </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <Root>
                <Button variant="contained" endIcon={<PersonIcon/>}  onClick={handleSignIn}>
                    Login
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