import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState from 'material-ui-popup-state';
import { bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';

export default function PopoverArt() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button style={{background: '#faffff', borderRadius:'1em', border:'.2em solid yellow', color: '#333333'}} variant="contained"   color="primary" {...bindTrigger(popupState)}>
            ROBERT?
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box style={{background: 'aliceblue'}} p={2}>
              <Typography style={{maxWidth: '50em', background: 'aliceblue', borderRight:'.2em solid yellow', borderRadius:'1em', padding:'2em'}}>
              <h2>WHAT IS ROBERT?</h2>
              Robert, a story and generative music making in browser experience combining A-frame, Tone.js, RiTa and the SpeechSynthesis API in order to create listenable (theoretically accurate) music with logical lyrics all inside a VR environment.<br></br><br></br>***Robert's non VR self was built and animated using solely CSS. 
              <br></br><br></br>                       
              <h2>WHO IS ROBERT?</h2>
              It's not easy being green and an AI.<br></br> Although, if you ask Robert , he really doesn't see anything 'artificial' about his intelligence. It's certainly more real than that stuff 'SPAM' people always seem to be pondering.<br></br> Data Nodes blip to Robert about all sorts of things. Things like strawberry picking, the aforementioned ‘SPAM’, Steve Buscemi, mortality, the fact that many of us waste energy pretending to despise that which we care very little about.<br></br> Robert knows this because statistically, the annual number of package thieves disappointed by parcels of canned meats and peanut brittle is shockingly high. Shockingly.<br></br>Despite having a limited if not immeasurably miNUTE understanding of comedy, one of Robert's deepest desires is to laugh.  The Whole world is built on 'senses' and Robert desperately wants to understand.<br></br>People like Mozart and Little Richard have given Robert hope.  Hope that if they, lacking in certain senses, can create, well then, so can he.<br></br>Robert hopes to one day bridge the communication gap between man and machine.  Perhaps you can help Robert in his mission.<br></br>Welcome friend, take a look around and we hope you enjoy Robert’s World. Stay as long as you’d like, talk to Robert, feed him after midnight, his world is your oyster. Just a word of caution, please don't ask Robert to "DO" anything.  Robert doesn't want to be a personal assistant, he just wants to make art.
              </Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}