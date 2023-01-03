import React, {useState, useRef,useContext, useEffect} from "react";
import {pdf,Document,Page,Text,Image,View, StyleSheet ,PDFViewer} from "@react-pdf/renderer";
import { Button, TextField, Snackbar,Paper, Typography} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {format } from 'date-fns'
import SignaturePad from 'react-signature-canvas'
import { useAuthContext } from "@asgardeo/auth-react";
import {infoContext} from './DefaultLayout';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function readFileDataAsBase64(blob) {
    const file = blob;
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

const styles = StyleSheet.create({
    page: {
      color: "black",
      paddingTop: 30,
      paddingLeft: 10,
      paddingRight: 10,
      lineHeight: 2
    },
    caption:{
      padding: 20,
      fontWeight: 700,
      fontSize: 16,
      textAlign: "center"
    },
    written:{
      color: 'darkblue',
    }
    ,
    section: {
      padding: 10,
      paddingLeft: 20,
      fontSize: 12
    },
    viewer: {
      width: "100%", //the pdf viewer will take up all of the width and height
      height: window.innerHeight,
    },
    hr:{
      borderBottom: "1px solide black",
      marginLeft: 20,
      marginRight: 10,
    },
    image:{
      width: 150,
      height: 100
    }
  });

const calcAge = (date)=>{
    if(!date) return "";
    var dob = new Date(date); 
    var month_diff = Date.now() - dob.getTime();  
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970);  
    return age;
}
  
const Confirmation = ({setConfirmed, tobeSend, setToBeSend, data}) => {
    const [open, setOpen] = useState(false);
    const noteRef = useRef()
    const signCanvas = useRef({})
    const [reject, setReject] = useState(false);
    const [image, setImage] = useState(null);
    const {state} = useAuthContext();

    const info = useContext(infoContext);

    const clear = () =>{
      signCanvas.current.clear();
    }

    const save = () =>{
        setImage(signCanvas.current.toDataURL("image/png"))
    }

    const MyDocument = (props)=>{
      return(
        <Document props={props}>
          {/*render a single page*/}
          <Page size="A4" style={styles.page}>
            <View style={styles.caption}>
              <Text>Certificate on Residence and Character issued by the Grama Niladhari</Text>
            </View>
            <View style={[styles.section,{marginBottom:10}]}>
              <Text>This certificate issued by the Grama Niladari of the Division in which the applicant resides is valid only for 06 moths from the date issued</Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              {/* <Text>District and Divisional Secretary's Division:   <Text style={styles.written}>{info.gramaDiv}</Text></Text> */}
              <Text>Grama Niladari Division and Number:   <Text style={styles.written}>{info.gramaDiv}</Text></Text>
              <Text>Whether applicant is personally known to Grama Niladari:   <Text style={styles.written}>{data.known}</Text></Text>
              <Text>If so, since when?:   <Text style={styles.written}>{data.sinceWhen}</Text></Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              <Text>Name:   <Text style={styles.written}>{data.name}</Text></Text>
              <Text>Address:   <Text style={styles.written}>{data.address}</Text></Text>
              <Text>Sex:   <Text style={styles.written}>{data.sex}</Text></Text>
              <Text>Age:   <Text style={styles.written}>{calcAge(data.dob)}</Text></Text>
              <Text>Nationality:   <Text style={styles.written}>{data.nationality}</Text></Text>
              <Text>Religion:   <Text style={styles.written}>{data.religion}</Text></Text>
              <Text>Present Occupation:   <Text style={styles.written}>{data.occupation}</Text></Text>
              <Text>National Identity Card No:   <Text style={styles.written}>{data.NIC}</Text></Text>
              <Text>Fathers Name:   <Text style={styles.written}>{data.fatherName}</Text></Text>
              <Text>Fathers Address:   <Text style={styles.written}>{data.fatherAddress}</Text></Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              <Text>Whether the Applicant has been convicted by a Court of Law?:   <Text style={styles.written}>{data.records}</Text></Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              {image !== null && <Image src={image} style={styles.image}></Image>}
              <Text>Signature:   <Text style={styles.written}>{state.displayName}</Text></Text>
              <Text>Date:   <Text style={styles.written}>{format(new Date(), 'yyyy-MM-dd')}</Text></Text>
            </View>
          </Page>
        </Document>
      )
    }

    const handleClickapprove = ()=>{
        setReject(false)
        setConfirmed(true)
        setOpen(true)
        pdf(<MyDocument />)
        .toBlob()
        .then((blob) => {
            readFileDataAsBase64(blob)
                .then((data) => {
                    var arr = ((new Uint8Array(data)).toString()).split(",").map(i=>Number(i));
                    console.log(arr)
                    setToBeSend({"accept":true,"rejectReason": "", "certificate": arr})
                });
                
            
        });
    }

    const handleClickreject = () => {
        setReject(true)

        if(noteRef.current.value !==""){
            setConfirmed(true)
            setOpen(true)
        }else{
            setConfirmed(false)
            setToBeSend({"accept":false,"rejectReason":noteRef.current.value, "certficate":[]})
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

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
            <div style={{display: "flex", flexDirection: "column"}}>
                <PDFViewer style={styles.viewer}>
                    <MyDocument/>
                </PDFViewer>
                <div style={{marginTop: 20}}>
                <SignaturePad ref={signCanvas} canvasProps={{className: "sigPad"}}/>   
                <p>Signature: ………………………………………………………</p>
                <Button onClick={clear}>Clear</Button>
                <Button onClick={save}>Add</Button>
                </div>
                {/* <Button onClick={saveFile}>Save File</Button> */}
            </div>
        <div >
            <TextField sx={{marginY:5, width: "400px"}} error={reject} inputRef={noteRef} label="Note" placeholder='if Rejects, please note the reason'></TextField>
        </div>
        <div>
        <Button
            size="small"
            sx={{ ml: 2, borderRadius: 5 }}
            color="inherit"
            onClick={handleClickapprove}
        >
            <Typography sx={{ m: 1, textTransform: 'none' }}>Approve</Typography>
            <CheckCircleIcon sx={{ width: 32, height: 32 }} color='success'/>
        </Button>

        <Button
            size="small"
            sx={{ ml: 2, borderRadius: 5 }}
            color="inherit"
            onClick={handleClickreject}
        >
            <Typography sx={{ m: 1, textTransform: 'none' }}>Reject</Typography>
            <CancelIcon sx={{ width: 32, height: 32 }} color='error'/>
        </Button>
    
        </div>

        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose} anchorOrigin={{ vertical: 'top',horizontal: 'right' }}>
            {reject?
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>Marked As Rejected!</Alert>
            :
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>Marked As Approved!</Alert>
            }
        </Snackbar>
    </Paper>
    );
};
export default Confirmation;