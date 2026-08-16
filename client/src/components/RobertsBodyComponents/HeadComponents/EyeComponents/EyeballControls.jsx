import React from 'react';
import { useStoreContext } from "../../../../services/GlobalState";
import './Awake.css'

export default function EyeballControls() {

    const state = useStoreContext();

    if (state[0].awake !== true) 
    return (
        <div className="electric_on_body eyeball">
            <div className="eyelid sleep-twitch">
                <div className="pupil"></div>
            </div>
        </div>
    )
    return (
        <div className="awake-eyeball">
            <div className="awake-blink awake-eyelid">
                <div className="awake-pupil-controls awake-pupil"></div>
            </div>
        </div>
    )
}
