import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';
import { Tooltip } from '@mui/material';
import birthcertificate from '../Assets/birthcertificate.pdf'
import id from '../Assets/id.pdf'
import AllPages from './AllPages';

function PaperComponent1(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title1"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function PaperComponent2(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title2"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [numPages, setNumPages] = React.useState(null);
  const [page, setPage] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleClickOpenIdentity = () => {
    setOpen1(true);
  };

  const handleClickOpenCertificate = () => {
    setOpen2(true);
  };

  const handleCloseIdentity = () => {
    setOpen1(false);
  };

  const handleCloseCertificate = () => {
    setOpen2(false);
  };

  return (
    <div style={{position: 'relative'}}>
      <Box sx={{position: 'absolute', top: 0, right: 0}}>
        <Box sx={{display: 'flex', flexDirection:'column'}}>
           
                <Fab color="warning" aria-label="edit" onClick={handleClickOpenIdentity} sx={{m:1}}>
                <Tooltip title="Identity Card">
                    <BadgeSharpIcon/>
                </Tooltip>
                </Fab>
           
           
            <Fab color="warning" aria-label="edit" onClick={handleClickOpenCertificate} sx={{m:1}}>
                <Tooltip title="Birth Certificate">
                    <DescriptionSharpIcon/>
                </Tooltip>
            </Fab>
        </Box>
      </Box>

     
      <Dialog
        open={open1}
        onClose={handleCloseIdentity}
        PaperComponent={PaperComponent1}
        aria-labelledby="draggable-dialog-title1"
        maxWidth = "xl"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title1">
          Identity Card
        </DialogTitle>
        <DialogContent>
          
            <AllPages pdf={id}/>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseIdentity}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleCloseCertificate}
        PaperComponent={PaperComponent2}
        aria-labelledby="draggable-dialog-title2"
        maxWidth = "xl"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title2">
          Birth Certificate
        </DialogTitle>
        <DialogContent>
         
            <AllPages pdf={birthcertificate}/>
        
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseCertificate}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
