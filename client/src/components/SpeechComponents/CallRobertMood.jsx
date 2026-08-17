import React from 'react'
import { useStoreContext } from "../../services/GlobalState";
import { SET_ROBERT_MOOD_RETURNING, DISPLAY_OBJECT, HIDE } from "../../services/actions";
import robertService from '../../services/robertService';
import Popper from '@mui/material/Popper';

// MUI dropped makeStyles after v4 and this popper only ever needed one rule,
// so it is a plain style object now (padding is the old theme.spacing(1)).
const paperStyle = {
  border: '1px solid red',
  borderRadius: '1em',
  padding: '8px',
  backgroundColor: '#8B0C14',
  color: 'white',
  textTransform: 'uppercase'
};

export default function CallRobertMood(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const [state, dispatch] = useStoreContext();

  //Holds random mood result
  let randomMood;

  //Call API to get all moods
  const setRobertReturning = () => {
    robertService.getAllMood({

    })
      .then(result => {
        const clearTitle = null;
        const toggleOn = true;
        const toggleOff = false;
        randomMood = result[Math.floor(Math.random() * result.length)];
        dispatch({
          type: SET_ROBERT_MOOD_RETURNING,
          mood: randomMood.mood,
        });
        dispatch({
          type: DISPLAY_OBJECT,
          yesNoButtons: toggleOn,
          displayButton: toggleOff,
          speech: randomMood.innerText,
          title: clearTitle
        });
        dispatch({
          type: HIDE
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div style={paperStyle}>What's on Robert's Mind?</div>
      </Popper>
      <button onMouseLeave={handleClose} onMouseOver={handleClick} className="bottom-market" style={state.display} onClick={setRobertReturning}><i style={{ color: 'rgba(255, 53, 46, 0.46)', fontSize: '5em', textShadow: '1px 2px 0px #010000' }} className="fa fa-user" aria-hidden="true"></i></button>
    </>
  )
}

