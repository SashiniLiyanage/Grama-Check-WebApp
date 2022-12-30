import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@mui/material';
import { QuestionAnswer } from '@mui/icons-material';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="warning"
                startIcon={<QuestionAnswer />}
                onClick={handleClickOpen}
                disableElevation >
                Get Help
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Get Help</DialogTitle>
                <DialogContent sx={{ textAlign: "left"}}>
                    <DialogContentText sx={{ marginBottom: 1 }}>
                        Having trouble with Grama Check? Ask for help from our team and we will be happy to help!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="Describe your problem..."
                        type="email"
                        fullWidth
                        variant='outlined'
                        multiline
                        rows={5}
                    />
                </DialogContent>
                <DialogActions sx={{ marginBottom: 2, marginRight: 2 }}>
                    <Button variant='outlined' color='error' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' disableElevation color="warning" onClick={handleClose}>Send</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}