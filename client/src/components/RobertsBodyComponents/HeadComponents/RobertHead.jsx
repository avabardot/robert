import React from 'react'
import GridDivs from './SpaceHolders/GridDivs'
import EyeArea from './EyeComponents/EyeArea'
import GridDivsContinued from './SpaceHolders/GridDivsContinued'
import MouthArea from './MouthComponents/MouthArea'
import GridDivsCont from './SpaceHolders/GridDivsCont'

//GridDivs contain body pieces not needed for control
    //Div with className contains breathing animation
export default function RobertHead (props) {
    return (
        <div className="planter-head-grid pulsate-fwd"> 
            <GridDivs {...props}/>
            <EyeArea {...props}/>
            <GridDivsContinued {...props}/>
            <MouthArea {...props}/>
            <GridDivsCont {...props}/>
        </div>
    )
}
