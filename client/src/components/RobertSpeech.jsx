import React from 'react';
import SpeechBubble from './SpeechComponents/SpeechBubble';
import DisplayBox from './ResultsComponents/DisplayBox';
import { useStoreContext } from "../services/GlobalState";

export default function RobertSpeech() {
    const state = useStoreContext();
    console.log();
    if(state[0].returning === null) { 
    return (
        <div>
            <div className="SpeechElementsContainer">
            </div>
        </div>
    )
    }
    return (
        <div className="SpeechElementsContainer">
            <div className="SpeechBubble"> 
                <SpeechBubble/>
            </div>
            <div className="DisplayBox">
                <DisplayBox/>
            </div>    
        </div>
    )
}
