import React from 'react';
import CallRobertMood from './SpeechComponents/CallRobertMood';
import Navbar from './NavigationComponent/Navbar'

export default function ActionButtons(props) {

    return (
        <div className="ActionButtonDiv">
            <CallRobertMood {...props} />
            <Navbar />
        </div>
    )
}
