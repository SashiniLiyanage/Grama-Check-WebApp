import React, {useRef, useState} from 'react';
import SignaturePad from 'react-signature-canvas'
import { Button, TextField, IconButton, Snackbar,Paper, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import BasicDocument from './BasicDocument';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const details = {"name":"fullname", "address":"No: 23/A, First Lane, Maharagama", "gramadiv": 1234, "gramaName": "garma name"}

const Confirmation = ({reject, setReject, setConfirmed}) => {
    const signCanvas = useRef({})
    const [image, setImage] = useState(null);
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

    const clear = () =>{
        signCanvas.current.clear();
    }

    const save = () =>{
        setImage(signCanvas.current.getTrimmedCanvas().toDataURL("image/png"))
    }

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
        {/* <Paper sx={{width: 'fit-content', textAlign: 'left', padding: 5, backgroundColor: "#fafafa"}}>
            
            <div style={{textAlign: 'center'}}><strong>Grama Niladhari Certification for Proprietor/Partner (s)/Director (s)/Wharf Representative (s)</strong></div>
            <br/>
            <p>Serial No of Registration at G/S office</p>
            <hr/>

            <p>I certify that Mr/Mrs/Ms (Full Name) <span className='uderline'>{details.name}</span> is residing at (address) <span className='uderline'>{details.address}</span> for <span className='uderline'></span> years.</p>
            <p>I also certify that he/she is registered as a voter within my G/S Division under registration
            number <span className='uderline'>{details.gramadiv}</span>.</p>

            <p>Name of Grama Niladhari: <span className='uderline'>{details.gramaName}</span></p>
            <p>Grama Niladhari Division: <span className='uderline'>{details.gramadiv}</span></p>
            <p>Date: <span className='uderline'>{Date.now()}</span><br/></p>
           
            <SignaturePad ref={signCanvas} canvasProps={{className: "sigPad"}}/>
                {/* <img src={image} alt="signature" style={{width: "150px", height:"100px"}}/>
            
            <p>Signature: ………………………………………………………</p>
            <Button onClick={clear}>Clear</Button>
            {/* <Button onClick={save}>Save</Button>

        </Paper> */}
        
            <BasicDocument/>
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