import React, { useEffect } from "react";
import "../App.css";
import "../Robert.css";
import RobertSpeech from '../components/RobertSpeech';
import RobertsBody from '../components/RobertsBodyComponents/RobertsBody';
import WakeButton from "../components/Buttons/WakeButton";
import Roundel from "../components/StainedGlass/Roundel";

export default function Home(props) {

    // Robert's page is dark (see NIGHT in StainedGlass.css). ?bg=pale shows
    // the pale blue page it used to be.
    useEffect(() => {
        const night = new URLSearchParams(window.location.search).get('bg') !== 'pale';
        document.body.classList.toggle('robert-night', night);
        return () => document.body.classList.remove('robert-night');
    }, []);

    return (
        <>
            <div className="RobertContainer">
                <RobertsBody {...props}/>
                <Roundel name="strawberry"/>
            </div>
            <div className= "SpeechContainer">
                <RobertSpeech {...props}/>
            </div>
            <WakeButton {...props}/>
        </>    

    )
}
