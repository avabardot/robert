import React from 'react'
import { useStoreContext } from "../../services/GlobalState";
export default function MessageResults() {
    const state = useStoreContext();
    //console.log(state[0])
    return (
        <div className="finalResultsDiv">
            <a href={state[0].link}>{state[0].linkName}</a>
        </div>
    )

}
