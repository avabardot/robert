import React, { useEffect } from "react";
import "../App.css";
import "../Robert.css";
import RobertSpeech from '../components/RobertSpeech';
import RobertsBody from '../components/RobertsBodyComponents/RobertsBody';
import WakeButton from "../components/Buttons/WakeButton";

export default function Home(props) {

    // Experiment: ?bg=black turns the page dark. See StainedGlass.css.
    useEffect(() => {
        const night = new URLSearchParams(window.location.search).get('bg') === 'black';
        document.body.classList.toggle('robert-night', night);
        return () => document.body.classList.remove('robert-night');
    }, []);

    return (
        <>
            <div className="RobertContainer">
                <RobertsBody {...props}/>
            </div>
            <div className= "SpeechContainer">
                <RobertSpeech {...props}/>
            </div>
            <WakeButton {...props}/>
        </>    

    )
}
