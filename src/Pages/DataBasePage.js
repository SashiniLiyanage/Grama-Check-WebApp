import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, TextField,Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const DataBasePage = props => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
         <Paper sx={{m: 3, p:3, backgroundColor:"#fafafa"}}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                View User Info
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
                        <td colSpan={2}><TextField fullWidth label="NIC" variant="outlined"/></td>
                    </tr>
                </tbody>
                </table>

            </Box>
            </Box>
            <Button variant="contained" startIcon={<PersonSearchIcon/>}>
                View
            </Button>
        </Paper>
        <Paper sx={{m: 3, p:3, backgroundColor:"#fafafa"}}>
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
            noValidate
            autoComplete="off"
            width={'100%'}
            maxWidth={'md'}
            >
                <table className='formTable'>
                <tbody>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Name" variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Address" variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Sex"  variant="outlined"/></td>
                        <td><TextField fullWidth label="DOB" variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Nationality" variant="outlined"/></td>
                        <td><TextField fullWidth label="Religion" variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Occupation"variant="outlined"/></td>
                    </tr>
                </tbody>
                </table>

            </Box>
            </Box>
            <Button variant="contained" startIcon={<AddCircleOutlineIcon />}>
                Update
            </Button>
        </Paper>
        <Paper sx={{m: 3, p:3, backgroundColor:"#fafafa"}}>
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
                        <td colSpan={2}><TextField fullWidth label="NIC" variant="outlined"/></td>
                    </tr>
                </tbody>
                </table>

            </Box>
            </Box>
            <Button variant="contained" color='error' onClick={handleClickOpen} startIcon={<DeleteIcon />}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose} autoFocus>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
        </Paper>
        </>
        
    );
};
export default DataBasePage;