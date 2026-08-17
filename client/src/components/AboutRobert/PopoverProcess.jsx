import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState from 'material-ui-popup-state';
import { bindTrigger, bindPopover } from 'material-ui-popup-state/hooks';

export default function PopoverProcess() {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <Button style={{background: '#faffff', borderRadius:'1em', border:'.2em solid yellow', color: '#333333'}} variant="contained" color="primary" {...bindTrigger(popupState)}>
            CREATION
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
              <Typography  style={{maxWidth: '50em', textAlign:'left', background: 'aliceblue', borderRight:'.2em solid yellow', borderRadius:'1em', padding:'2em'}} >                        
              <h2>The Idea</h2>
              <br></br>
              What was supposed to be a simple educational experiment in cuboids and keyframes quickly became anything but simple.  An accidental animation error (animation resembled breath) and a fortunate shadow disaster (shadows resembled realistic mars landing) got me thinking about synthesizing life in the DOM.  From the illusion of free choice with well structured data to speech synthesis to 3Drendering; I knew that I needed to begin exploring this idea. And In order to do so, I realized that I’d need to create a space that was both buildable and comfortable with change.<br></br><br></br> It seemed to me that a good starting place would be to try and build a (very limited) "artificial assistant." With childhood memories of Microsoft's Clippy still in my head, I began designing what would become the face of my virtual assistant. Besides being a great excuse to practice building and animating with CSS, building a face for my Virtual Assistant was important to me in concept*.<br></br>*see sidebar
              <br></br><br></br>
              <h5>(A Sidebar About the Future)</h5>
              <br></br>
              <h5>...</h5>
              <br></br>
              As we continue to automate our lives and the creation of our culture, it is important that we form positive attachments with the machines that help us.  No, I'm not saying that we need to talk to them because they're listening and want to talkback.  I just mean, that in order for us to maintain a certain level of contentment in the world, we are going to need to completely redefine our definitions of “success”. <br></br><br></br>As a society, we will not be able to survive if we continue to define one’s value with measurable accomplishments because, at the end of the day,  we aren't going to be able to keep up with the machine.<br></br><br></br> Essentially, I'm saying that we're going to need to submit to our AI overlords but that sounds CRAZY and I think the implications of that sentence sound much more sinister than the reality I envision. I don’t think they’re going to “come for us", at least intentionally. I just think that they have the ability to outperform us. Like pets trusting in humans, we’ll need to do the same with our machines.  If we cannot bond with these machines, find them likeable, I think there will always be a general level of mistrust and animosity towards them.<br></br><br></br>That mistrust not only limits our technological accomplishments but it also, if we feel that these machines we don’t like or trust are “better” than us,  nurtures an inferiority complex and thus feeds into a deep feeling of discontentment . <br></br><br></br> However, if we can learn to like our AI, relate to it, form a sort of a parent-child relationship with it, I believe we’ll be much happier as a society.  What does research teach us about bonding?  A lot of it has to do with mimicry and facial expressions.  That is essentially why I gave Robert a face, to make him more likeable and trustworthy. We are emotional creatures and do not want to be taken care of by something we fear.<br></br>
              <h5>...</h5>
              <br></br>
              With that concept in mind, I wanted to create a personal assistant that used, "moods'' as a reference point for interactions. Initially, I envisioned Robert recommending a sweetly melancholic song if it were raining in a users location or sometimes choosing NOT to divy up information if Robert wasn't "feeling like it."  Although the Data in my API still resembles that model, I decided early on not to continue with the idea, at least for the time being.  Instead, I decided to go in a completely different direction.<br></br><br></br>An interest in machine learning and generative design led me to begin building a program that makes generative music in the browser.
              <br></br><br></br>
              <h2>CONCEPT GENERATIVE ART</h2>
              <br></br><br></br>
              <h4>TONE.js</h4>
              For the generative music portion of Robert, I experimented minimally with some of what p5.js had to offer before settling on Tone.js.  Tone is a web audio framework built on top of the Web Audio API.<br></br><br></br>My “first life” was as a bassoonist and thus I hold years of unused, if not rusty, music education in my head. While this helped with writing the functions that generate the actual music, this knowledge wasn’t as helpful as I’d hoped when it came to building with Tone.js as classical textbooks don't have sections on "Envelopes and Oscillators'', components of Synths. Which, for the purposes of building Robert, using a Tone.js Synth was critical.<br></br><br></br>Despite the learning curve,  I managed to learn enough about Synths (thank you Evan) to create three fun sounding Synths for the generative piece of music that plays in Robert's World.  Although the music sounds as though a single Synth is playing, due to the nature of the Synths I chose and the sound I wanted to create, I in fact wrote functions that allowed for three separate synths to be played simultaneously.  This required me to write functions that made sure that if a certain note were being played on one synth, a note in the correct key and chord structure would be played.<br></br><br></br>
              <h4>RiTa And Web Speech API</h4>
              After creating the generative music portion of Robert, I realized that I’d like him to sing. This was and is still, my greatest challenge.<br></br><br></br>Unfortunately, the WebSynthesis API does not allow for a voice to change pitch or speed in the middle of a phrase.  Nor does it have enough pitch variance to mimic singing.  Despite this, I still wrote a series of functions that pick random speeds and pitches for Robert’s voice in between lines of speech.<br></br><br></br>I also experimented with connecting the Speech Synthesis API with Tone.js, hoping to create a customizable synth in place of the synth the Speech Synthesis API uses.  I’m still working on connecting the two, uncertain if it’s even possible as this seems to be a very niche desire and there seems to be very little documentation on doing such a thing.<br></br><br></br> Aware that engineers have been using the Hidden Markov Model for predictive speech since at least the 70s, I decided that I wanted to do something similar when it came to the actual words being spoken by Robert. Without the time to build my own Markov chain, I settled on a general understanding of the concept and experimented with a number of packages before settling on RiTa.<br></br><br></br>Using RiMarkov(a function of RiTa), I fed RiMarkov a selection of questions I thought Robert might ask if he were around as well as an array of lyrics from artists such as Laurie Anderson, David Byrne, Daft Punk and Kraftwerk. I then wrote a series of functions that would allow Robert to compose lyrics in a song-like manner (i.e, refrain, lyrics, hook). This function is still a work in progress, currently Robert sings 4 lines, a refrain consisting of a random word like “la” or “shoobie” followed by an infinite number of lyrics.
              <h4>A-Frame</h4>
              A-Frame is what a user sees when they enter Robert’s world. It is an entity component system for Three.js that allows for HTML building of VR and AR scenes. This was a fantastic learning opportunity as I knew very little abou 3D-Object modeling and how easy it is to lose a solid hour flipping an object across the wrong axis over and over and over again.  I genuinely love it and recommend it to anyone wanting a better understanding of the z-axis.<br></br><br></br>I cannot wait to construct more of Robert's reality. I’d like to learn how to better support my application and improve rendering speed and quality.  When things get 3D your files get less SPEEDY. <br></br><br></br>On that note:
              <br></br><br></br>
              <br></br><br></br>
              <h2>Other Mini Projects and Lessons with Robert</h2>
              <ul>
               <li style={{textAlign:'left'}}>Write and implement first Cookie (non-edible) to verify returning or new user</li>
               <li style={{textAlign:'left'}}>Use Reducer in React</li>
               <li style={{textAlign:'left'}}>Circumnavigate CORS erros</li>
               <li style={{textAlign:'left'}}>You cannot have more than one "voice" speaking with the Web Speech API.  Thus, you cannot have a robot barber shopquartet (2021 Updates please)</li>
               <li style={{textAlign:'left'}}>mongoDB troubleshooting</li>
               <li style={{textAlign:'left'}}>Browserify and the definition of "isomorphism"</li>
               <li style={{textAlign:'left'}}>gltf. is not slang for "gefeltah" as in "Gefeltah fish"</li>
               <li style={{textAlign:'left'}}>Brian Eno and Synths</li>
               <li style={{textAlign:'left'}}>The importance of good documentation</li>
              </ul>
              </Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}