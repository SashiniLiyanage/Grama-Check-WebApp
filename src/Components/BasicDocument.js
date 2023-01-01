import {pdf,Document,Page,Text,Image,View,StyleSheet,PDFViewer} from "@react-pdf/renderer";
import React, {useState, useRef, useEffect, useContext} from "react";
import {format } from 'date-fns'
import SignaturePad from 'react-signature-canvas'
import { Button} from '@mui/material';
import { useAuthContext } from "@asgardeo/auth-react";
import {infoContext} from '../App';

// import { saveAs } from "file-saver";
import id from '../Assets/id.pdf'

const styles = StyleSheet.create({
    page: {
      color: "black",
      paddingTop: 30,
      paddingLeft: 10,
      paddingRight: 10
    },
    caption:{
      padding: 20,
      fontWeight: 700,
      fontSize: 16,
      textAlign: "center"
    },
    written:{
      color: 'darkblue',
      lineHeight: 2
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
  
  // Create Document Component
  function BasicDocument({data}) {
    const signCanvas = useRef({})
    const [image, setImage] = useState(null);
    const [blob, setBlob] = useState(id);
    const {state} = useAuthContext();

    const info = useContext(infoContext);

    const clear = () =>{
      signCanvas.current.clear();
    }

    const save = () =>{
        setImage(signCanvas.current.toDataURL("image/png"))
    }

    const MyDocument = ()=>{
      return(
        <Document>
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
              <Text>Grama Niladari Division and Number:   <Text style={styles.written}>{data.gramaDiv}</Text></Text>
              <Text>Whether applicant is personally known to Grama Niladari:   <Text style={styles.written}>Yes</Text></Text>
              <Text>If so, since when?:   <Text style={styles.written}> </Text></Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              <Text>Name:   <Text style={styles.written}>{data.name}</Text></Text>
              <Text>Address:   <Text style={styles.written}>{data.address}</Text></Text>
              <Text>Sex:   <Text style={styles.written}>{data.sex}</Text></Text>
              <Text>Age:   <Text style={styles.written}>age</Text></Text>
              <Text>Nationality:   <Text style={styles.written}>{data.nationality}</Text></Text>
              <Text>Religion:   <Text style={styles.written}>{data.religion}</Text></Text>
              <Text>Present Occupation:   <Text style={styles.written}>{data.occupation}</Text></Text>
              <Text>National Identity Card No:   <Text style={styles.written}>{data.NIC}</Text></Text>
              <Text>Fathers Name:   <Text style={styles.written}>{data.fatherName}</Text></Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              <Text>Whether the Applicant has been convicted by a Court of Law?:   <Text style={styles.written}>add here</Text></Text>
              <Text>His/her Character:   <Text style={styles.written}>{data.records}</Text></Text>
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

    const saveFile = () => {
      pdf(<MyDocument />)
        .toBlob()
        .then((blob) => setBlob(blob));
    };

    return (
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
      <Button onClick={saveFile}>Save File</Button>
      </div>
    );
  }
  export default BasicDocument;