import React, {useRef, useState} from 'react'
import StartPanel from './StartPanel';

export default function StartButton() {
const startButton = useRef();

const [show, setShow] = useState(true);

const onButtonClick = (props) => {
    setShow(false);
    console.log(show);
}
    if (show === false)
    return (
        null
    )
    return (
        <>
            <a-entity useRef={startButton} onClick={onButtonClick} id="TRYIT" position="0 2.7 1.544" text__tryit_text="height: 3; value: ACTIVATE ME!; width: 2.5; align: center; zOffset: 0.15; color: #ffffff; opacity: 0.7; yOffset: 0.15" rotation="" geometry="depth: 0.2; height: 0.3" material="color: #04040b"></a-entity>
            <StartPanel show={show} />
        </>
    )
}
