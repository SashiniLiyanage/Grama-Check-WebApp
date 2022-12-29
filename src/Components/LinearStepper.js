import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EnhancedTable from './EnhancedTable';
import Review from './Review';
import Confirmation from './Confirmation';
import { useHistory } from 'react-router-dom';

const steps = ['Select Request', 'Review Request', 'Confirm'];

export default function LinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selected, setSelected] = React.useState([{}]);
  const [confirmed, setConfirmed] = React.useState(false);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const ValidNext =(param)=>{
    switch(param){
      case 1:
        return JSON.stringify(selected[0])==='{}'
      case 2:
        return false
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
        return <Review request={selected[0]}/>;
      case 3:
        return <Confirmation setConfirmed={setConfirmed}/>;
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
          <Typography sx={{ mt: 2, mb: 1 }}>
            Request is Approved
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
            disabled={ValidNext(activeStep + 1)}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}