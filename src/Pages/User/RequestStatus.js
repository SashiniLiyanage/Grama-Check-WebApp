import { Button, Card, CardContent, Divider, Typography } from "@mui/material"
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import { Fastfood, LaptopMac, Hotel, Repeat, Download, Article, Delete } from "@mui/icons-material";
import { useState } from "react";
import { textAlign } from "@mui/system";

export default function RequestStatus() {
    const [status, setStatus] = useState("Pending");
    const [NIC, setNIC] = useState();
    const [gramaName, setGramaName] = useState();

    return (
        <>

            <Card sx={{ m: 1, width: '35vw' }}>
                <CardContent>
                    <Typography variant="h5">Certificate Request Progress</Typography>

                    <Divider light sx={{ m: 1, marginBottom: 5 }} />

                    <div>
                        <Timeline position="alternate">
                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="success" />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Submit Application</TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="success" />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Verify Address</TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot color="success" />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Confirm Identity</TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" color="warning" />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Validate Documents</TimelineContent>
                            </TimelineItem>

                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" color="secondary" />
                                    <TimelineConnector />
                                </TimelineSeparator>
                                <TimelineContent>Perform Police Check</TimelineContent>
                            </TimelineItem>


                            <TimelineItem>
                                <TimelineSeparator>
                                    <TimelineDot variant="outlined" />
                                </TimelineSeparator>
                                <TimelineContent>Issue Grama Certificate</TimelineContent>
                            </TimelineItem>
                        </Timeline>
                    </div>

                </CardContent>
            </Card>

            <Card sx={{ m: 1, width: '55vw' }}>
                <CardContent>
                    <Typography variant="h5">Grama Certificate Details</Typography>

                    <Divider light sx={{ m: 1, marginBottom: 5 }} />

                    <div style={{ margin: 30, textAlign: 'left' }}>
                        <Typography><b>Full Name:</b> </Typography>
                        <Typography><b>NIC Number:</b></Typography>
                        <br />
                        <Typography><b>Grama Division:</b> </Typography>
                        <Typography><b>Gramasevaka Name:</b> {gramaName}</Typography>
                    </div>

                    <Divider sx={{ m: 2, ml: 4, mr: 4 }} />

                    <div style={{ margin: 30, textAlign: 'left' }}>
                        <Typography sx={{ marginBottom: 4 }}><b>Certificate Status:</b> Rejected</Typography>

                        <Typography><b>Reason:</b></Typography>
                        <Typography sx={{ marginBottom: 4 }}>Blah Blah Blah</Typography>
                    </div>

                    <Divider sx={{ m: 1, mt: 10, mb: 5 }} />

                    <div>
                        <Button
                            variant="contained"
                            startIcon={<Download />}
                            disableElevation
                            sx={{ m: 1}}>
                            Download Grama Certificate
                        </Button>
                        <Button
                            variant="contained"
                            color="warning"
                            startIcon={<Article />}
                            disableElevation
                            sx={{ m: 1}}>
                            Request New Certificate
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<Delete />}
                            disableElevation
                            sx={{ m: 1, display: 'none'}}>
                            Delete Request
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </>
    )
};