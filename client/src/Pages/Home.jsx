import React, { useEffect } from "react";
import "../App.css";
import "../Robert.css";
import RobertSpeech from '../components/RobertSpeech';
import RobertsBody from '../components/RobertsBodyComponents/RobertsBody';
import WakeButton from "../components/Buttons/WakeButton";
import { useStoreContext } from "../services/GlobalState";
import Roundels from "../components/StainedGlass/Roundel";

export default function Home(props) {

    // Robert's page is dark (see NIGHT in StainedGlass.css). ?bg=pale shows
    // the pale blue page it used to be.
    // At night the whole page behind his window is glass too (GLASS WALL in
    // StainedGlass.css); ?wall=off leaves it black.
    const [state] = useStoreContext();

    useEffect(() => {
        const asked = new URLSearchParams(window.location.search);
        const night = asked.get('bg') !== 'pale';
        document.body.classList.toggle('robert-night', night);
        document.body.classList.toggle('robert-wall', night && asked.get('wall') !== 'off');
        return () => document.body.classList.remove('robert-night', 'robert-wall');
    }, []);

    // The wall is lit by the same switch as the window: waking Robert.
    useEffect(() => {
        document.body.classList.toggle('robert-awake', state.awake === true);
        return () => document.body.classList.remove('robert-awake');
    }, [state.awake]);

    return (
        <>
            <div className="RobertContainer">
                <RobertsBody {...props}/>
                <Roundels/>
            </div>
            <div className= "SpeechContainer">
                <RobertSpeech {...props}/>
            </div>
            <WakeButton {...props}/>
        </>    

    )
}
