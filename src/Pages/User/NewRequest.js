import { Send } from '@mui/icons-material';
import { Card, CardContent, Divider, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import HelpDialog from '../../Components/HelpDialog';
import UploadButton from '../../Components/UploadButton';
import { infoContext } from "../../Components/DefaultLayout";
import axios from 'axios';
import config from '../../config.json';



export default function NewRequest({requested, setRequested}) {
    const info = useContext(infoContext);

    const [loading, setLoading] = useState(false);

    // Populate grama divs
    const provinces = [
        "Western Province",
        "Central Province",
        "Southern Province",
        "Nothern Province",
        "Eastern Province",
        "North-Western Province",
        "North-Central Province",
        "Uva Province",
        "Sabaragamuwa  Province"
    ];

    const [districts, setDistricts] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [gramaDivs, setGramaDivs] = useState([]);


    const [province, setProvince] = useState();
    const [district, setDistrict] = useState();
    const [gramaDiv, setGramaDiv] = useState();

    const handleProvince = (event) => {
        setProvince(event.target.value);

        axios.get(`${config.url}/${event.target.value}/all-districts`, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
            }
        }).then((res) => {
            const d = [];
            Object.values(res.data.data.districts).forEach((el) => d.push(el.district));

            setDistricts(d);
        })
            .catch((err) => alert(err));
    }


    const handleDistrict = (event) => {
        setDistrict(event.target.value);

        axios.get(`${config.url}/${province}/${event.target.value}/all-divisions`, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
            }
        }).then((res) => {
            const d = [];
            Object.values(res.data.data.divisions).forEach((el) => d.push(el.division));

            setDivisions(d);
        })
            .catch((err) => alert(err));
    }

    const handleDivision = (event) => {

        axios.get(`${config.url}/${province}/${district}/${event.target.value}/all-grama-divisions`, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
            }
        }).then((res) => {
            const d = [];
            Object.values(res.data.data.gramaDivisions).forEach((el) => d.push({ id: el.gramaDivisionID, name: el.gramaDivision }));

            setGramaDivs(d);
        })
            .catch((err) => alert(err));
    };


    const [NIC, setNIC] = useState(info.NIC);
    const [name, setName] = useState(`${info.givenName} ${info.familyName}`);
    const [mobileNo, setMobileNo] = useState(info.phoneNumber);
    const [doB, setDoB] = useState(dayjs(info.birthdate));
    const [occupation, setOccupation] = useState();

    const [mobileNoError, setMobileNoError] = useState(false);
    const [mobileHelperText, setMobileHelperText] = useState("");

    const [NICFile, setNICFile] = useState();
    const [birthCert, setBirthCert] = useState();

    const [filePayload, setFilePayload] = useState({
        "NIC": NIC,
        "nic-file": undefined,
        "birth-cert-file": undefined
    });


    const handleNIC = (event) => {
        setNIC(event.target.value);

        setFilePayload({ ...filePayload, ["NIC"]: event.target.value });
    };


    const handleMobileNo = (event) => {
        setMobileNo(event.target.value);
    }

    useEffect( () => {
        if (mobileNo.match(/^0[0-9]{9}$/)) {
            setMobileNo("+94" + mobileNo.substring(1));
        }
        else {
            if (!mobileNo.match(/\+94/)) {
                setMobileNo("+94");
            }

            if (mobileNo.length>12) {
                setMobileNo(mobileNo.substring(0,12));
            }

            if (mobileNo.length<12) {
                setMobileNoError(true);
                setMobileHelperText("Mobile number must contain 12 digits");
            }
            else {
                setMobileNoError(false);
                setMobileHelperText("");
            }
        }
    }, [mobileNo]);



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

    const handleNICFile = (event) => {
        if (event.target.files.length !== 0) {
            setNICFile(event.target.files[0]);

            readFileDataAsBase64(event)
                .then((data) => {
                    const nicPayload = [...(new Uint8Array(data))];
                    setFilePayload({ ...filePayload, ["nic-file"]: nicPayload });
                });
        }
    };

    const handleBC = (event) => {
        if (event.target.files.length !== 0) {
            setBirthCert(event.target.files[0]);

            readFileDataAsBase64(event)
                .then((data) => {
                    const bcPayload = [...(new Uint8Array(data))];
                    setFilePayload({ ...filePayload, ["birth-cert-file"]: bcPayload });
                });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (mobileNoError) {
            return;
        }

        setLoading(true);

        let nicHash = "";
        let bcHash = "";

        //First upload the docs
        axios.post(`${config.url}/upload`,
            filePayload, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
            }
        }).then((res) => {
            nicHash = res.data.data.nicHash;
            bcHash = res.data.data.birthCertHash;
        })
        .catch((err) => alert(err));


        // Post Request
        const payload = {
            "DoB": doB.format("YYYY-MM-DD"),
            "NIC": NIC,
            "NICImage": nicHash,
            "birthCertImage": bcHash,
            "gramaDivisionID": gramaDiv,
            "mobileNo": mobileNo,
            "name": name,
            "occupation": occupation
        }


        axios.post(`${config.url}/upload`,
            payload, {
            headers: {
                Authorization: `Bearer ${info.access_token}`,
            }
        }).then((res) => {
            setLoading(false);
            setRequested(true);
        })
        .catch((err) => {
            alert(err);
            setLoading(false);
        });
    };


    return (
        (!info.phoneNumber) ?
            <LinearProgress /> :
            (
                <Card sx={{ m: 1 }}>
                    <CardContent >
                        <Typography variant="h5">Apply for a Grama Certificate</Typography>

                        <Divider light sx={{ m: 1, marginBottom: 5 }} />


                        <form autoComplete='true' onSubmit={handleSubmit} >
                            <div>
                                <TextField sx={{ m: 1 }} id="NIC" label="NIC Number" defaultValue={info.NIC} onChange={handleNIC} required />
                                <TextField sx={{ m: 1, width: "60vw", minWidth: 500 }} id="Name" label="Full Name" defaultValue={info.givenName + " " + info.familyName} onChange={(e) => setName(e.target.value)} required />
                            </div>

                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <DesktopDatePicker
                                        id="DoB"
                                        label="Date of Birth"
                                        inputFormat="DD/MM/YYYY"
                                        defaultValue={dayjs(info.birthdate)}
                                        value={doB}
                                        onChange={(e) => setDoB(e)}
                                        renderInput={(params) => <TextField sx={{ m: 1 }} {...params} />}
                                    />
                                </LocalizationProvider>
                                <TextField
                                    sx={{ m: 1, width: "30vw", minWidth: 250 }}
                                    id="Occcupation"
                                    label="Occupation"
                                    defaultValue=""
                                    onChange={(e) => setOccupation(e.target.value)}
                                    required />
                                <TextField
                                    sx={{ m: 1, width: "20vw", minWidth: 200 }}
                                    id="MobileNo"
                                    label="Mobile Number"
                                    onChange={handleMobileNo}
                                    value={mobileNo}
                                    error={mobileNoError}
                                    helperText={mobileHelperText}
                                    required />
                            </div>

                            <div>

                            </div>

                            <div>
                                <FormControl sx={{ m: 1, minWidth: 250 }} >
                                    <InputLabel id="province-label" required >Province</InputLabel>
                                    <Select
                                        labelId="province-label"
                                        id="province"
                                        label="Province"
                                        defaultValue=""
                                        onChange={handleProvince}
                                    >
                                        {provinces.map((p, idx) =>
                                            <MenuItem key={idx} value={p}>{p}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 250 }} >
                                    <InputLabel id="district-label" required >District</InputLabel>
                                    <Select
                                        labelId="district-label"
                                        id="district"
                                        label="District"
                                        defaultValue=""
                                        onChange={handleDistrict}
                                    >
                                        {districts.map((d, idx) =>
                                            <MenuItem key={idx} value={d}>{d}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 300 }} >
                                    <InputLabel id="division-label" required >Division</InputLabel>
                                    <Select
                                        labelId="division-label"
                                        id="division"
                                        label="Division"
                                        defaultValue=""
                                        onChange={handleDivision}
                                    >
                                        {divisions.map((d, idx) =>
                                            <MenuItem key={idx} value={d}>{d}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, minWidth: 300 }} >
                                    <InputLabel id="grama-division-label" required >Gramasevaka Division</InputLabel>
                                    <Select
                                        labelId="grama-division-label"
                                        id="grama-division"
                                        label="Gramasevaka Division"
                                        defaultValue=""
                                        onChange={(e) => setGramaDiv(e.target.value)}
                                        
                                    >
                                        {gramaDivs.map((d, idx) =>
                                            <MenuItem key={idx} value={d.id}>{d.id + " - " + d.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </div>

                            <div>
                                <UploadButton
                                    label={NICFile ? NICFile.name : "Scanned Copy of NIC"}
                                    accept="application/pdf"
                                    onChange={handleNICFile}
                                    sx={{ m: 1, marginTop: 5 }} />

                                <UploadButton
                                    label={birthCert ? birthCert.name : "Scanned Copy of Birth Certificate"}
                                    accept="application/pdf"
                                    onChange={handleBC}
                                    sx={{ m: 1 }} />
                            </div>

                            <Divider sx={{ m: 2, marginTop: 5 }} />

                            <div>
                                <LoadingButton loading={loading} variant="contained" component="label" sx={{ m: 1 }} startIcon={<Send />} disableElevation>
                                    Submit Application
                                    <input hidden type="submit" />
                                </LoadingButton>

                                <HelpDialog />
                            </div>

                        </form>

                    </CardContent>
                </Card>
            )
    );
}