import React from 'react'
import PopoverArt from './PopoverArt';
import PopoverTimeline from './PopoverTimeline';
import PopoverProcess from './PopoverProcess';

export default function ParagraphHolder() {

    return (
        <>
            <div className="FullStackTitle">
                <h1>Hello,</h1>
                <h1>I'm</h1>
                <h1>Robert</h1>
            </div>
            <div className="emptyTwo">
            </div>
            <div className="Buttons">
                <PopoverArt/>
            </div>    
            <div className="Buttons">    
                <PopoverProcess/>
            </div>    
            <div className="Buttons">    
                <PopoverTimeline/>
            </div>
        </>

    )
}
