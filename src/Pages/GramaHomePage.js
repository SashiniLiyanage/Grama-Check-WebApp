import React, {useState} from 'react';
import {Box,Stepper,Step,StepLabel,Button,Typography} from '@mui/material';
import EnhancedTable from '../Components/EnhancedTable';
import Review from '../Components/Review';
import Confirmation from '../Components/Confirmation';
import { useHistory } from 'react-router-dom';

const steps = ['Select Request', 'Review Request', 'Confirm'];

export default function GramaHomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [selected, setSelected] = useState([{}]);
  const [confirmed, setConfirmed] = useState(false);
  const [reviewed, setReviewed] = useState(false);
  const [reject, setReject] = useState({"status":false, "msg":""});
  const history = useHistory()
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setReviewed(false)
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setReviewed(false)
    setConfirmed(false)
  };

  const handleReset = () => {
    history.push("/")
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
        return <Review request={selected[0]} setReviewed={setReviewed}/>;
      case 3:
        return <Confirmation setConfirmed={setConfirmed} reject={reject} setReject={setReject} />;
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
          {reject.status?
          <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1, color:"red"}}>
            The Gramasewaka Certificate is Rejected!
          </Typography>
          <Typography sx={{ mt: 2, mb: 1}}>
            Reason: {reject.msg} 
          </Typography>
          </React.Fragment>
          :
          <Typography sx={{ mt: 2, mb: 1, color:"green" }}>
            The Gramasewaka Certificate is Approved!
          </Typography>
          }
          
          <Box sx={{ pt: 5 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Go Back To Requests</Button>
          </Box>
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
    </Box>
  );
}