import React, {useEffect, useState} from 'react';
import DraggableDialog from './DraggableDialog';
import {Typography, TextField, Button, Box, Paper, Snackbar, IconButton} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import {useContext } from 'react';
import {infoContext} from './DefaultLayout';
import config from '../config.json';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const calcAge = (date)=>{
    if(!date) return "";
    var dob = new Date(date); 
    var month_diff = Date.now() - dob.getTime();  
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970);  
    return age;
}


const Preview = ({request, setReviewed, setData}) => {

    const [name, setName] = useState(request.Name)
    const [address, setAddress] = useState(request.Address);
    const [sex, setSex] = useState(request.Sex);
    const [dob, setDob] = useState(request.DOB);
    const [age, setAge] = useState(calcAge(request.DOB));
    const [nationality, setNationality] = useState("");
    const [religion, setReligion] = useState(request.Religion);
    const [occupation, setOccupation] = useState(request.Occupation);
    const [fatherName, setFatherName] = useState(request.FatherName);
    const [fatherAddress, setFatherAddress] = useState(request.FatherName);
    const [records, setRecords] = useState("No");
    const [loading, setLoading] = useState(true);
    const [known, setKnown] = useState("");
    const [sinceWhen, setSinceWhen] = useState("");

    const [open, setOpen] = React.useState(false);
    const info = useContext(infoContext);

    const handleClick = () => {
        setOpen(true);
        setReviewed(!loading);
        setData({name,address, NIC: request.NIC, age,sex,dob,nationality,religion,occupation,fatherName,fatherAddress,records})
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    useEffect(()=>{

        axios.get(`${config.url}/police-records`, {
            headers: {
              Authorization: `Bearer ${info.access_token}`,
              NIC: request.NIC
            }
          })
          .then(function (response) {
            if(response.data.data.matchFound){
                setRecords(response.data.msg)
            }
          })
          .catch(function (error) {
            console.log(error);
          })

          setLoading(false)
          
    },[])

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

    return (
        <div>
            <DraggableDialog NIC={request.NIC}/>
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
                        <td><TextField fullWidth disabled label="National Identity Card" defaultValue={request.NIC} variant="outlined"/></td>
                        <td><TextField fullWidth label="Nationality" defaultValue={request.nationality} error={nationality==""} onChange={(e)=>{setNationality(e.target.value)}} variant="outlined"/></td>

                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Age" defaultValue={calcAge(request.DOB)} error={age==""} onChange={(e)=>{setAge(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth label="DOB" defaultValue={request.DOB} error={dob==""} onChange={(e)=>{setDob(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                    <td>
                        <TextField fullWidth label="Sex" defaultValue={request.Sex} error={sex==""} onChange={(e)=>{setSex(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth label="Religion" defaultValue={request.Religion} error={religion==""} onChange={(e)=>{setReligion(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Occupation" defaultValue={request.Occupation} error={occupation==""} onChange={(e)=>{setOccupation(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Fathers Name" defaultValue={request.FatherName} error={fatherName==""} onChange={(e)=>{setFatherName(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Fathers Address" defaultValue={request.FatherAddress} error={fatherAddress==""} onChange={(e)=>{setFatherAddress(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Applicant is known" error={known==""} onChange={(e)=>{setKnown(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Since When" error={sinceWhen==""} onChange={(e)=>{setSinceWhen(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Criminal Records" disabled defaultValue={records} variant="outlined"/></td>
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