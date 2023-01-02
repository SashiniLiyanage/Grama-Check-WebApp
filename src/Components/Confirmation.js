import React, {useEffect, useRef, useState} from 'react';
import { Button, TextField, IconButton, Snackbar,Paper, Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BasicDocument from './BasicDocument';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Confirmation = ({reject, setReject, setConfirmed, data}) => {
    const [open, setOpen] = useState(false);
    const noteRef = useRef()

    const handleClickapprove = ()=>{
        setReject({"status":false, "msg": noteRef.current.value})
        setConfirmed(true)
        setOpen(true)
    }

    const handleClickreject = () => {
        setReject({"status":true, "msg": noteRef.current.value})

        if(noteRef.current.value !==""){
            setConfirmed(true)
            setOpen(true)
        }else{
            setConfirmed(false)
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    useEffect(()=>{
        console.log("data",data)
    },[])

    return (
        <Paper sx={{padding: 2}}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
                >
                Confirmation
            </Typography>
            <BasicDocument data={data}/>
        <div >
            <TextField sx={{marginY:5, width: "400px"}} error={reject.status} inputRef={noteRef} label="Note" placeholder='if Rejects, please note the reason'></TextField>
        </div>
        <div>
        <Button
            size="small"
            sx={{ ml: 2, borderRadius: 5 }}
            color="inherit"
            onClick={handleClickapprove}
        >
            <Typography sx={{ m: 1, textTransform: 'none' }}>Approve</Typography>
            <CheckCircleIcon sx={{ width: 32, height: 32 }} color='success'/>
        </Button>

        <Button
            size="small"
            sx={{ ml: 2, borderRadius: 5 }}
            color="inherit"
            onClick={handleClickreject}
        >
            <Typography sx={{ m: 1, textTransform: 'none' }}>Reject</Typography>
            <CancelIcon sx={{ width: 32, height: 32 }} color='error'/>
        </Button>
    
        </div>

        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom',horizontal: 'center' }}>
            {reject.status?
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Marked As Rejected!</Alert>
            :
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Marked As Approved!</Alert>
            }
        </Snackbar>
    </Paper>
    );
};
export default Confirmation;