import {pdf,Document,Page,Text,Image,View,StyleSheet,PDFViewer} from "@react-pdf/renderer";
import React, {useState, useRef} from "react";
import {format } from 'date-fns'
import SignaturePad from 'react-signature-canvas'
import { Button} from '@mui/material';
import { useAuthContext } from "@asgardeo/auth-react";
// import { saveAs } from "file-saver";

  const details = {
    "gramaID": "541/A",
    "gramaDistrict": "Rathmalana",
    "gramaDiv": "mount",
    "name": "Peter Perera",
    "address": "No: 5, First Lane, Rathmalana",
    "sinceWhen": "2 years",
    "sex": "Male",
    "age": "26",
    "SriLankan": "Yes",
    "religion": "Buddhist",
    "occupation": "Business",
    "father": "Michel Perera",
    "policeReport":"Clear",
    "NIC": "9673829377V",
    "character":"Good"
  }

  

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
  function BasicDocument() {
    const signCanvas = useRef({})
    const [image, setImage] = useState(null);
    const {state, getBasicUserInfo} = useAuthContext();

    const clear = () =>{
      signCanvas.current.clear();
    }

    const save = () =>{
        setImage(signCanvas.current.toDataURL("image/png"))
    }

    // const saveFile = () => {
    //   // This does the trick!
    //   pdf(<MyDocument />)
    //     .toBlob()
    //     .then((blob) => saveAs(blob, "YourFileName.pdf"));
    // };

    return (
      <div style={{display: "flex", flexDirection: "column"}}>
      <PDFViewer style={styles.viewer}>
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
              <Text>District and Divisional Secretary's Division:   <Text style={styles.written}>{details.gramaDistrict}</Text></Text>
              <Text>Grama Niladari Division and Number:   <Text style={styles.written}>{details.gramaDiv} - {details.gramaID}</Text></Text>
              <Text>Whether applicant is personally known to Grama Niladari:   <Text style={styles.written}>Yes</Text></Text>
              <Text>If so, since when?:   <Text style={styles.written}>{details.sinceWhen}</Text></Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              <Text>Name:   <Text style={styles.written}>{details.name}</Text></Text>
              <Text>Address:   <Text style={styles.written}>{details.address}</Text></Text>
              <Text>Sex:   <Text style={styles.written}>{details.sex}</Text></Text>
              <Text>Age:   <Text style={styles.written}>{details.age}</Text></Text>
              <Text>Whether Sri Lankan:   <Text style={styles.written}>{details.SriLankan}</Text></Text>
              <Text>Religion:   <Text style={styles.written}>{details.religion}</Text></Text>
              <Text>Present Occupation:   <Text style={styles.written}>{details.occupation}</Text></Text>
              <Text>National Identity Card No:   <Text style={styles.written}>{details.NIC}</Text></Text>
              <Text>Fathers Name:   <Text style={styles.written}>{details.father}</Text></Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              <Text>Whether the Applicant has been convicted by a Court of Law?:   <Text style={styles.written}>{details.policeReport}</Text></Text>
              <Text>His/her Character:   <Text style={styles.written}>{details.character}</Text></Text>
            </View>
            <View style={styles.hr}></View>
            <View style={styles.section}>
              {image !== null && <Image src={image} style={styles.image}></Image>}
              <Text>Signature:   <Text style={styles.written}>{state.displayName}</Text></Text>
              <Text>Date:   <Text style={styles.written}>{format(new Date(), 'yyyy-MM-dd')}</Text></Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
      <div style={{marginTop: 20}}>
      <SignaturePad ref={signCanvas} canvasProps={{className: "sigPad"}}/>   
      <p>Signature: ………………………………………………………</p>
      <Button onClick={clear}>Clear</Button>
      <Button onClick={save}>Add</Button>
      </div>
      </div>
    );
  }
  export default BasicDocument;