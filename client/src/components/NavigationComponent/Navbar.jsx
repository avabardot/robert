import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { useStoreContext } from "../../services/GlobalState";
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

export default function Navbar() {

  const [state] = useStoreContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  }
    
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
    
  return (
    <>  
      <Link to="/world" className="bottom-market" style={state.display}><i style={{color:'rgba(255, 53, 46, 0.46)', fontSize:'5em', textShadow: '1px 2px 0px #010000'}} className="fa fa-map-signs" aria-hidden="true"></i></Link>
      <Link onMouseEnter={handleClick} onMouseLeave={handleClose}  to="/aboutrobert" className="bottom-market" style={state.display}><i style={{color:'rgba(255, 53, 46, 0.46)', fontSize:'5em', textShadow: '1px 2px 0px #010000'}} className="fa fa-child" aria-hidden="true"></i></Link>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <div style={paperStyle}>About Robert</div>
      </Popper>
    </>
  )
}
