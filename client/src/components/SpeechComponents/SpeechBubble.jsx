import React from 'react'
import { useStoreContext} from "../../services/GlobalState";
import YesNoButtons from './YesNoButtons';
import ActionButtons from '../ActionButtons';

export default function SpeechBubble() {
    //SETTING STATES
    
    const [state] = useStoreContext();

    //Determine if user is returning thus what to render
    if(state.returning !== true) {
        return (
            <div className="BubbleGoodies">
                <p>{state.newUserSpeech}</p>
                <ActionButtons/>
                <YesNoButtons/>
            </div>
        )
    }
    return (
        <div className="BubbleGoodies">
            <h2>{state.speech}</h2>
            <ActionButtons/>
            <YesNoButtons/>
        </div>
    )
}
