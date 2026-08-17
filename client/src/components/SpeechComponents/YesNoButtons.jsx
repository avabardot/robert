import React from 'react';
import { useStoreContext} from "../../services/GlobalState";
import { RESET_ROBERT } from "../../services/actions";
import YesButtonTasks from "./YesButtonTasks";
export default function YesNoButtons(props) {

    const [state, dispatch] = useStoreContext();

    const resetTasks = () => {

        dispatch({
            type:  RESET_ROBERT,
        });
    }
    if(state.displayButton === true)
    return (
       null
    )
    return (
        <div className="YesNoButtons">
            <YesButtonTasks {...props} />
            <button className="bottom-market" onClick={resetTasks}><i style={{color: 'rgba(255, 53, 46, 0.46)', fontSize:'5em', textShadow: '1px 2px 0px #010000'}} className="fa fa-frown-o" aria-hidden="true"></i></button>
        </div>
    )
    
}

