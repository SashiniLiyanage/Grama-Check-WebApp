import React, {useContext, useEffect, useState} from 'react';
import {Box,Stepper,Step,StepLabel,Button,Snackbar} from '@mui/material';
import EnhancedTable from '../Components/EnhancedTable';
import Review from '../Components/Review';
import Confirmation from '../Components/Confirmation';
import { useHistory } from 'react-router-dom';
import { infoContext } from '../Components/DefaultLayout';
import MuiAlert from '@mui/material/Alert';
import config from '../config.json';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const steps = ['Select Request', 'Review Request', 'Confirm'];

export default function GramaHomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = useState([{}]);
  const [confirmed, setConfirmed] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [data, setData] = useState({});
  const [pending, setPending] = useState(true);
  const [tobeSend, setToBeSend] = useState({"accept":false, "rejectReason":""});
  const [msg, setMsg] = useState("")
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = React.useState(false);
  const history = useHistory()
  const info = useContext(infoContext)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setReviewed(false)
    if(activeStep === steps.length - 1){

      axios.post(`${config.url}/validate`, {
        NIC: data.NIC,
        mobileNo: "+94713585988",
        accept: tobeSend.accept,
        rejectReason: tobeSend.rejectReason,
        certificate: tobeSend.certificate,
        
      },{
        headers: {
          Authorization: `Bearer ${info.access_token}`,
        }
      })
      .then(function (response) {
        setMsg("Uploaded Successfuly");
        setOpen(true);
        setSeverity("success")
      })
      .catch(function (error) {
        setMsg(error.message)
        setOpen(true);
        setSeverity("error")
        console.log(error)
      }).finally(function () {
          setPending(false)
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setReviewed(false)
    setConfirmed(false)
  };

  const handleReset = () => {
    history.push("/")
  };

  const handleClose = () => {
    setOpen(false);
  };

  const disableNext =(param)=>{
    switch(param){
      case 1:
        return JSON.stringify(selected[0])==='{}'
      case 2:
        return !reviewed
      case 3:
        return !confirmed
      default:
        return false
    }
  }

  const renderSwitch = (param) => {
    switch(param) {
      case 1:
        return <EnhancedTable selected={selected} setSelected={setSelected}/>;
      case 2:
        return <Review request={selected[0]} setReviewed={setReviewed} setData={setData}/>;
      case 3:
        return <Confirmation setConfirmed={setConfirmed} setToBeSend={setToBeSend} data={data}/>;
      default:
        return <div>Error: Please reload the page</div>;
    }
  }


  return (
    <Box sx={{ padding: 3 }}>
      <Stepper activeStep={activeStep} sx={{paddingBottom: 3}}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          
          {pending? <p style={{color: "green"}}>Uploading...</p> :
              <div>
                <Box sx={{ pt: 5 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Go Back To Requests</Button>
                </Box>
              </div>
          } 
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>{renderSwitch(activeStep + 1)}</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button 
            variant="contained"
            onClick={handleNext}
            disabled={disableNext(activeStep + 1)}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top',horizontal: 'right' }}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
              {msg}
          </Alert>
      </Snackbar>
    </Box>
  );
}