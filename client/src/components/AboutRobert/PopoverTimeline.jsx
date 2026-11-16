import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState from 'material-ui-popup-state';
import { bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';
import baby from './Assets/Images/baby.PNG';

export default function PopoverTimeline() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button style={{background: '#faffff', borderRadius:'1em', border:'.2em solid yellow', color: '#333333'}} variant="contained" color="primary" {...bindTrigger(popupState)}>
            CONTACT
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
          >
            <Box style={{background: 'aliceblue'}}p={2}>
              <Typography  style={{maxWidth: '50em', background: 'aliceblue', borderRight:'.2em solid yellow', borderRadius:'1em', padding:'2em'}} >
              <div style={{background: 'aliceblue'}}>
                <h2>CONTACT ME</h2>
                <a style={{color:'#9DC3C2'}} href="https://en.wikipedia.org/wiki/Markov_chain" target="_blank" rel="noopener noreferrer">MARKOV CHAINS:</a> en.wikipedia.org/wiki/Markov_chain
                <br></br><br></br>
                <a style={{color:'#2274A5'}} href="https://www.kahlilgibran.com/images/The%20Prophet%20Ebook%20by%20Kahlil%20Gibran.pdf" target="_blank" rel="noopener noreferrer">A GEM:</a> The Prophet, Kahlil Gibran
                <br></br><br></br>
                <a style={{color:'#77A6B6'}}>EMAIL:</a> placeholder
                <br></br><br></br>
                <a style={{color:'#4D7298'}}> WEBSITE:</a> placeholder
                <br></br><br></br>
              </div>
                </Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}