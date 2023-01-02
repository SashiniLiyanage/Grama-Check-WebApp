import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Delete } from '@mui/icons-material';
import { infoContext } from "./DefaultLayout";
import axios from 'axios';
import config from '../config.json';


export default function DeleteDialog({ display , setRequested }) {
    const info = useContext(infoContext);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [toastOpen, setToastOpen] = useState(false);

    const handleToastClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setToastOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = (event) => {

        setLoading(true);

        axios.delete(`${config.url}/request`, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
                NIC: info.NIC
            }
        }).then((res) => {
            setLoading(false);
            setToastOpen(true);
            setOpen(false);
            setRequested(false);
        })
            .catch((err) => {
                alert(err);
                setLoading(false);
    });

};

return (
    <>
        <Button
            variant="contained"
            color="error"
            startIcon={<Delete />}
            disableElevation
            sx={{ m: 1, display: display }}
            onClick={handleClickOpen}>
            Delete Request
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Confirm Request Delete
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete the pending certificate request? This operation cannot be undone!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <LoadingButton loading={loading} color="error" variant="contained" onClick={handleDelete} autoFocus>
                    Yes
                </LoadingButton>
            </DialogActions>
        </Dialog>

        <Snackbar
            open={toastOpen}
            autoHideDuration={6000}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            onClose={handleToastClose}
        >
            <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
                Request deleted! Redirecting to new request page.
            </Alert>
        </Snackbar>
    </>
);
}