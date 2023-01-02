import React, {useEffect, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import {Typography, TextField, Button, Box, Paper, Snackbar, IconButton} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { infoContext } from '../Components/DefaultLayout';
import { useContext } from 'react';
import {format } from 'date-fns'
import axios from 'axios';
import config from '../config.json'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

  
const DataBasePage = props => {
    const info = useContext(infoContext);

    const [opendialog, setOpendialog] = React.useState(false);
    const [msg, setMsg] = React.useState("");
    const [severity, setSeverity] = React.useState('success')
    const [name, setName] = useState("");
    const [NIC, setNIC] = useState("");
    const [deleteNIC, setDeleteNIC] = useState("");
    const [address, setAddress] = useState("");
    const [sex, setSex] = useState("");
    const [dob, setDob] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [age, setAge] = useState("");
    const [nationality, setNationality] = useState("");
    const [district, setDistrict] = useState("");
    const [province, setProvince] = useState("");
    const [gramaID, setGramaId] = useState(info.gramaDiv);
    const [division, setDivision] = useState("");
    const [religion, setReligion] = useState("");
    const [occupation, setOccupation] = useState("");
    const [fatherName, setFatherName] = useState("");
    const [fatherAddress, setFatherAddress] = useState("")

    const [open, setOpen] = React.useState(false);
   
    const handleClosedialog = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpendialog(false);
    };

    const handleClickOpendialog = () => {
        if(deleteNIC==""){
            setOpen(true);
            setMsg("Please Enter the NIC number")
            setSeverity("error")
            return
        }
        setOpendialog(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = ()=>{
        if(NIC=="" || name=="" || dob==""){
            setOpen(true);
            setMsg("Please Fill All The Required Feilds")
            setSeverity("error")
            return
        }
        axios.put(`${config.url}/people/add`, 
        {
            "DoB": dob,
            "NIC": NIC,
            "Name": name,
            "address": address,
            "age": age,
            "district": district,
            "division": division,
            "fatherAddress": fatherAddress,
            "fatherName": fatherName,
            "gramaDivisionID": gramaID,
            "occupation": occupation,
            "province": province,
            "religion": religion,
            "sex": sex
        },
        {
            headers: {
              Authorization: `Bearer ${info.access_token}`,
            }
          })
          .then(function (response) {
            setOpen(true);
            setMsg("User Information Updated Successfuly")
            setSeverity("success")
          })
          .catch(function (error) {
            setOpen(true);
            setMsg(error.message)
            setSeverity("error")
            console.log(error)
            
        })

    }
   
    const handleDelete = ()=>{
        handleClosedialog()
        axios.delete(`${config.url}/people/delete`, 
        {
            headers: {
              Authorization: `Bearer ${info.access_token}`,
              "NIC": deleteNIC,
            }
        })
          .then(function (response) {
            setOpen(true);
            setMsg("User Information Deleted Successfuly")
            setSeverity("success")
          })
          .catch(function (error) {
            setOpen(true);
            setMsg(error.message)
            setSeverity("error")
            
        })
    }

    return (
        <>
        <Paper sx={{m: 3, p:3}}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                Add/Update User Info
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
                        <td colSpan={2}><TextField type={'text'}  required error={name===""} fullWidth label="Name" onChange={(e)=>{setName(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField type={'text'} fullWidth label="Address" onChange={(e)=>{setAddress(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td><TextField fullWidth  type={'text'} required error={NIC==""} label="National Identity Card"  onChange={(e)=>{setNIC(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth  type={'text'} label="Nationality" onChange={(e)=>{setNationality(e.target.value)}} variant="outlined"/></td>

                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Province"  type={'text'} onChange={(e)=>{setProvince(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth label="District"  type={'text'} onChange={(e)=>{setDistrict(e.target.value)}} variant="outlined"/></td>

                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Division"  type={'text'}  onChange={(e)=>{setDivision(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth disabled required label="Grama ID" defaultValue={info.gramaDiv} type={'text'} onChange={(e)=>{setGramaId(e.target.value)}} variant="outlined"/></td>

                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Age"  type={'text'} onChange={(e)=>{setAge(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth  required defaultValue={format(new Date(), 'yyyy-MM-dd')} error={dob===""} label="DOB"  type={'date'} onChange={(e)=>{setDob(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                    <td>
                        <TextField fullWidth label="Sex"  type={'text'} onChange={(e)=>{setSex(e.target.value)}} variant="outlined"/></td>
                        <td><TextField fullWidth label="Religion"  type={'text'} onChange={(e)=>{setReligion(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth  type={'text'} label="Occupation" onChange={(e)=>{setOccupation(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth  type={'text'} label="Fathers Name" onChange={(e)=>{setFatherName(e.target.value)}} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth  type={'text'} label="Fathers Address" onChange={(e)=>{setFatherAddress(e.target.value)}} variant="outlined"/></td>
                    </tr>
                </tbody>
                </table>
                
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top',horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {msg}
                    </Alert>
                </Snackbar>

            </Box>
            </Box>
            <Button sx={{m: 3}} variant="contained" onClick={handleAdd} startIcon={<AddCircleOutlineIcon />}>
                Update
            </Button>
        </Paper>
        <Paper sx={{m: 3, p:3}}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                Delete User Info
            </Typography>
            <Box sx={{display: 'flex', alignItems:'center', justifyContent:'center'}}>
            <Box
            component="form"
            noValidate
            autoComplete="off"
            width={'100%'}
            maxWidth={'md'}
            >
                <table className='formTable'>
                <tbody>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="NIC" variant="outlined" onChange={(e)=>{setDeleteNIC(e.target.value)}}/></td>
                    </tr>
                </tbody>
                </table>

            </Box>
            </Box>
            <Button sx={{m: 3}} variant="contained" color='error' onClick={handleClickOpendialog} startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Dialog
                open={opendialog}
                onClose={handleClosedialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete the info?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you really want to delete the record? This process cannot be reversed. 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClosedialog}>Cancel</Button>
                <Button onClick={handleDelete} autoFocus>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </Paper>
        <br/>
        </>
        
    );
};
export default DataBasePage;