import { Button, Card, CardContent, Divider, Typography } from "@mui/material"
import { Download } from "@mui/icons-material";
import { useState, useContext, useEffect } from "react";
import { infoContext } from "../../Components/DefaultLayout";
import DeleteDialog from "../../Components/DeleteDialog";
import axios from 'axios';
import fileDownload from "js-file-download";
import config from '../../config.json';
import NewRequestDialog from "../../Components/NewRequestDialog";

export default function RequestStatus({ requested, setRequested }) {
    const info = useContext(infoContext);

    const [status, setStatus] = useState("Accepted");
    const [rejectReason, setRejectReason] = useState("");


    useEffect(() => {
        axios.get(`${config.url}/request`, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
                NIC: info.NIC
            }
        }).then((res) => {
            setStatus(res.data.data.status);

            if (res.data.data.status) {
                setRejectReason(res.data.data.reason);
            }
        }).catch((err) => alert(err));

    }, [info.NIC, info.access_token]);


    const handleDownload = () => {
        axios.get(`${config.url}/certificate`, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
                NIC: info.NIC
            },
            responseType: "blob"
        }).then((res) => fileDownload(res.data, `GramaCertificate-${info.NIC}.pdf`))
            .catch((err) => alert(err));

    };

    return (
        <>
            <Card sx={{ m: 1, width: '55vw' }}>
                <CardContent>
                    <Typography variant="h5">Grama Certificate Details</Typography>

                    <Divider light sx={{ m: 1, marginBottom: 5 }} />

                    <div style={{ margin: 30, textAlign: 'left' }}>
                        <Typography><b>NIC Number:</b> {info.NIC}</Typography>
                    </div>

                    <Divider sx={{ m: 2, ml: 4, mr: 4 }} />

                    <div style={{ margin: 30, textAlign: 'left' }}>
                        <Typography sx={{ marginBottom: 4 }}><b>Certificate Status:</b> {status}</Typography>

                        <Typography sx={{ display: (status === "Rejected") ? "inline" : "none" }}><b>Reject Reason:</b></Typography>
                        <Typography sx={{ marginBottom: 4, display: (status !== "Rejected") ? "none" : "block" }}>{rejectReason}</Typography>
                    </div>

                    <Divider sx={{ m: 1, mt: 8, mb: 5 }} />

                    <div>
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            disableElevation
                            sx={{ m: 1, display: (status === "Accepted") ? "inline-block" : "none" }}
                            onClick={handleDownload}>
                            Download Grama Certificate
                        </Button>
                        {/*<Button
                            variant="contained"
                            color="warning"
                            startIcon={<Article />}
                            disableElevation
                            sx={{ m: 1, display: (status === "Rejected" || status === "Accepted") ? "inline-block" : "none" }}>
                            Request New Certificate
    </Button>*/}
                        <NewRequestDialog display={(status === "Rejected" || status === "Accepted") ? "inline-block" : "none"} setRequested={setRequested} />

                        <DeleteDialog display={(status === "Pending") ? "inline-block" : "none"} setRequested={setRequested} />
                        
                    </div>

                </CardContent>
            </Card>
        </>
    )
};