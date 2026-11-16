import React from 'react'
import { useStoreContext} from "../../services/GlobalState";

// What Robert says once he is awake. The buttons that used to sit under his
// words (his mood, the yes/no faces, the links to his world and the About
// page) are gone: the stained glass roundels are the way into his world now.
export default function SpeechBubble() {
    const [state] = useStoreContext();

    //Determine if user is returning thus what to render
    if(state.returning !== true) {
        return (
            <div className="BubbleGoodies">
                <p>{state.newUserSpeech}</p>
            </div>
        )
    }
    return (
        <div className="BubbleGoodies">
            <h2>{state.speech}</h2>
        </div>
    )
}
