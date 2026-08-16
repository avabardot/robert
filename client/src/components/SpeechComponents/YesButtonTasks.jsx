import React from 'react';
import { useStoreContext} from "../../services/GlobalState";
import { SET_PROJECT, DISPLAY_OBJECT, SHOW } from "../../services/actions";
import robertService from '../../services/robertService'; 

export default function YesButtonTasks(props) {
    const [state, dispatch] = useStoreContext();

let randomProject;

const YesButtonTasks = () => {
    robertService.getAllProject({

    })
    .then(result => {
        const linkDisplay= true;
        const toggleOff = false;
        const toggleOn = true;
        const checkIt = 'SURPRISE';
        console.log(randomProject)
      randomProject= result[Math.floor(Math.random()*result.length)];
      dispatch({
        type: SET_PROJECT,
        title: checkIt,
        link: randomProject.link,
        description: randomProject.description
      });
      dispatch({
        type:  DISPLAY_OBJECT,
        showLink: linkDisplay,
        yesNoButtons: toggleOff,
        displayButton: toggleOn,
        speech: randomProject.description,
        link: randomProject.link,
        linkName: checkIt
        
    });
    dispatch({
        type:  SHOW,
    });
    })
    .catch(err => console.log(err));
};
    return (
        <>
            <button className="bottom-market" onClick={YesButtonTasks}><i style={{color: 'rgba(255, 53, 46, 0.46)', fontSize:'5em', textShadow: '1px 2px 0px #010000'}} className="fa fa-smile-o" aria-hidden="true"></i></button>
        </>
    )
}




    

