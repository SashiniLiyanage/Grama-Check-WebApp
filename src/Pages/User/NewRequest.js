import { Send } from '@mui/icons-material';
import { Button, Card, CardContent, Divider, FormControl, InputLabel, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import HelpDialog from '../../Components/HelpDialog';
import UploadButton from '../../Components/UploadButton';

export default function NewRequest() {
    const [NIC, setNIC] = useState();
    const [birthCert, setBirthCert] = useState();

    function readFileDataAsBase64(e) {
        const file = e.target.files[0];

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsArrayBuffer(file);
        });
    }

    const handleNIC = (event) => {
        if (event.target.files.length !== 0) {
            setNIC(event.target.files[0]);

            readFileDataAsBase64(event)
                .then((data) => {
                    console.log("[" + (new Uint8Array(data)).toString() + "]")
                });

        }
    };

    const handleBC = (event) => {
        if (event.target.files) {
            setBirthCert(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Card sx={{ m: 1 }}>
            <CardContent >
                <Typography variant="h5">Apply for a Grama Certificate</Typography>

                <Divider light sx={{ m: 1, marginBottom: 5 }} />


                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <div>
                        <TextField sx={{ m: 1 }} id="NIC" label="NIC Number" required />
                        <TextField sx={{ m: 1, width: "60vw", minWidth: 500 }} id="Address" label="Address" required />
                    </div>

                    <div>
                        <FormControl sx={{ m: 1, minWidth: 250 }} >
                            <InputLabel id="province-label" required >Province</InputLabel>
                            <Select
                                labelId="province-label"
                                id="province"
                                label="Province"
                            >
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 250 }} >
                            <InputLabel id="district-label" required >District</InputLabel>
                            <Select
                                labelId="district-label"
                                id="district"
                                label="District"
                            >
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 300 }} >
                            <InputLabel id="division-label" required >Division</InputLabel>
                            <Select
                                labelId="division-label"
                                id="division"
                                label="Division"
                            >
                            </Select>
                        </FormControl>

                        <FormControl sx={{ m: 1, minWidth: 300 }} >
                            <InputLabel id="grama-division-label" required >Gramasevaka Division</InputLabel>
                            <Select
                                labelId="grama-division-label"
                                id="grama-division"
                                label="Gramasevaka Division"
                            >
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <UploadButton
                            label={NIC ? NIC.name : "Scanned Copy of NIC"}
                            accept="application/pdf"
                            onChange={handleNIC}
                            sx={{ m: 1, marginTop: 5 }} />

                        <UploadButton
                            label={birthCert ? birthCert.name : "Scanned Copy of Birth Certificate"}
                            accept="application/pdf"
                            onChange={handleBC}
                            sx={{ m: 1 }} />
                    </div>

                    <Divider sx={{ m: 2, marginTop: 5 }} />

                    <div>
                        <Button variant="contained" component="label" sx={{ m: 1 }} startIcon={<Send />} disableElevation>
                            Submit Application
                            <input hidden type="submit" />
                        </Button>

                        <HelpDialog />
                    </div>

                </form>

            </CardContent>
        </Card>
    );
}