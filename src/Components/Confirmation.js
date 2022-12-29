import React, {useEffect, useRef, useState} from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import SignaturePad from 'react-signature-canvas'
import { Button, TextField } from '@mui/material';

const details = {"name":"fullname", "address":"No: 23/A, First Lane, Maharagama", "gramadiv": 1234, "gramaName": "garma name"}

const Confirmation = ({setConfirmed}) => {
    const signCanvas = useRef({})
    const [image, setImage] = useState(null);
    const [reject, setReject] = useState(false);

    const handleApprove = ()=>{
        setReject(false)
        setConfirmed(true)
    }

    const handleReject = ()=>{
        setReject(true)
        setConfirmed(true)
    }

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
        <div className='center'>
        <Paper sx={{width: 'fit-content', textAlign: 'left', padding: 5, backgroundColor: "#fafafa"}}>
            
            <div style={{textAlign: 'center'}}><strong>Grama Niladhari Certification for Proprietor/Partner (s)/Director (s)/Wharf Representative (s)</strong></div>
            <br/>
            <p>Serial No of Registration at G/S office</p>
            <hr/>

            <p>I certify that Mr/Mrs/Ms (Full Name) <u>{details.name}</u> is residing at (address) <u>{details.address}</u> for <u>5</u> years.</p>
            <p>I also certify that he/she is registered as a voter within my G/S Division under registration
            number <u>{details.gramadiv}</u>.</p>

            <p>Name of Grama Niladhari: <u>{details.gramaName}</u></p>
            <p>Grama Niladhari Division: <u>{details.gramadiv}</u></p>
            <p>Date: <u>{Date.now()}</u><br/></p>
           
                <SignaturePad ref={signCanvas} canvasProps={{className: "sigPad"}}/>
                <Button onClick={clear}>Clear</Button>
                <Button onClick={save}>Save</Button>
                {/* <img src={image} alt="signature" style={{width: "150px", height:"100px"}}/> */}
            
            <p>Signature: …………………………………….</p>

        </Paper>
        </div>
        <div >
            <TextField sx={{marginTop:5}} error={reject} label="Note" fullWidth placeholder='if Rejects, please note the reason'></TextField>
        </div>
        <div>
            <Button variant='contained' color='primary' onClick={handleApprove} sx={{mx: 1, my:3}}>Approve</Button>
            <Button variant='contained' color='warning' onClick={handleReject} sx={{mx: 1, my:3}}>Reject</Button>
        </div>
        
    </Paper>
    );
};
export default Confirmation;