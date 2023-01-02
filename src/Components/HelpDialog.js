import { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { QuestionAnswer } from '@mui/icons-material';
import { infoContext } from "./DefaultLayout";
import axios from 'axios';
import config from '../config.json';


export default function HelpDialog() {
    const info = useContext(infoContext);

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");
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

    const handleSend = (event) => {
        event.preventDefault();

        const payload = {
            email: info.email,
            msg: msg
        }

        setLoading(true);

        axios.post(`${config.url}/help`,
            payload, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
            }
        }).then((res) => {
            setLoading(false);
            setToastOpen(true);
            setOpen(false);
        })
        .catch((err) => alert(err));

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
                <form autoComplete="off" onSubmit={handleSend}>
                    <DialogTitle>Get Help</DialogTitle>
                    <DialogContent sx={{ textAlign: "left" }}>
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
                            required
                            onChange={(e) => setMsg(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions sx={{ marginBottom: 2, marginRight: 2 }}>
                        <Button variant='outlined' color='error' onClick={handleClose} sx={{ mr: 1 }}>Cancel</Button>
                        <LoadingButton loading={loading} variant='contained' component="label" disableElevation color="warning">
                            Send
                            <input hidden type="submit" />
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar
                open={toastOpen}
                autoHideDuration={6000}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                onClose={handleToastClose}
            >
                <Alert onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
                    Help request sent! We will contact you via email to resolve your issue.
                </Alert>
            </Snackbar>
        </>
    );
}