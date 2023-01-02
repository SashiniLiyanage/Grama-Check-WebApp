import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { Article } from '@mui/icons-material';


export default function NewRequestDialog({ display , setRequested }) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNewRequest = (event) => {
        setOpen(false);
        setRequested(false);
};

return (
    <>
        <Button
            variant="contained"
            color="warning"
            startIcon={<Article />}
            disableElevation
            sx={{ m: 1, display: display }}
            onClick={handleClickOpen}>
            Request New Certificate
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Confirm New Request
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to make a new certificate request?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button variant="contained" onClick={handleNewRequest} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    </>
);
}