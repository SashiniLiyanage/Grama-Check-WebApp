import React, {useEffect, useRef} from 'react';
import DraggableDialog from './DraggableDialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


const Preview = ({request}) => {

    const nameRef = useRef('');
    const addressRef = useRef('');
    const sexRef = useRef('');
    const dobRef = useRef('');
    const nationalityRef = useRef('');
    const religionRef = useRef('');
    const occupationRef = useRef('');

    useEffect(()=>{
        console.log(nameRef.current.value)
    },[nameRef])

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
            noValidate
            autoComplete="off"
            width={'100%'}
            maxWidth={'md'}
            >
                <table className='formTable'>
                <tbody>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Name" defaultValue={request.Name} ref={nameRef} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Address" defaultValue={request.Address} ref={addressRef} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Sex" defaultValue={request.Sex} ref={sexRef} variant="outlined"/></td>
                        <td><TextField fullWidth label="DOB" ref={dobRef} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td><TextField fullWidth label="Nationality" ref={nationalityRef} variant="outlined"/></td>
                        <td><TextField fullWidth label="Religion" ref={religionRef} variant="outlined"/></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><TextField fullWidth label="Occupation" ref={occupationRef} variant="outlined"/></td>
                    </tr>
                </tbody>
                </table>

            </Box>
        </Box>
        </Paper>
        </div>
    );
};

export default Preview;