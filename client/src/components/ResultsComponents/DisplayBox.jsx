import React from 'react';
import { useStoreContext } from "../../services/GlobalState";
import MessageResults  from  './MessageResults';


export default function DisplayBox() {

    const state = useStoreContext();
    //console.log(state);
    if(state.link !== null)
    return (
        <div className="yesButtonTasks">
            <MessageResults/>
        </div>
    )
    return (
        null
    )

}