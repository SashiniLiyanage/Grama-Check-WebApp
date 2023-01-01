import React, {useEffect, useState} from 'react';
import DraggableDialog from './DraggableDialog';
import {Typography, TextField, Button, Box, Paper, Snackbar, IconButton} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import {useContext } from 'react';
import { infoContext } from "./DefaultLayout";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Preview = ({request, setReviewed}) => {

    const [name, setName] = useState(request.Name)
    const [address, setAddress] = useState(request.address);
    const [sex, setSex] = useState(request.sex);
    const [dob, setDob] = useState("");
    const [nationality, setNationality] = useState("");
    const [religion, setReligion] = useState("");
    const [occupation, setOccupation] = useState("");

    const [open, setOpen] = React.useState(false);
    const info = useContext(infoContext);
    
    const handleClick = () => {
        setOpen(true);
        setReviewed(true)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
        >
            <CloseIcon fontSize="small" />
        </IconButton>
        </React.Fragment>
    );

    React.useEffect(()=>{
        console.log("reveiew", info.username)
    })

    return (
        <div>
            <DraggableDialog/>
            <Paper sx={{paddingY: 2}}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                Review Request
            </Typography>

            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <Box
            component="form"
            // noValidate
            autoComplete="off"
            width={'100%'}
            maxWidth={'md'}
            >
                <table className='formTable'>
                <tbody>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Name" defaultValue={request.Name} error={name==""} onChange={(e)=>{setName(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Address" defaultValue={request.Address} error={address==""} onChange={(e)=>{setAddress(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Sex" defaultValue={request.Sex} error={sex==""} onChange={(e)=>{setSex(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth label="DOB" error={dob==""} onChange={(e)=>{setDob(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Nationality" error={nationality==""} onChange={(e)=>{setNationality(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth label="Religion" error={religion==""} onChange={(e)=>{setReligion(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Occupation" error={occupation==""} onChange={(e)=>{setOccupation(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                        <Button
                            size="small"
                            sx={{ ml: 2, borderRadius: 5 }}
                            color="inherit"
                            onClick={handleClick}
                        >
                            <Typography sx={{ m: 1, textTransform: 'none' }}>Complete Review</Typography>
                            <CheckCircleIcon sx={{ width: 32, height: 32 }} color='success'/>
                        </Button>
                        </td>
                    </tr>
                </tbody>
                </table>
                
                <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom',horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Details updated!
                    </Alert>
                </Snackbar>

            </Box>
        </Box>
        </Paper>
        </div>
    );
};

export default Preview;