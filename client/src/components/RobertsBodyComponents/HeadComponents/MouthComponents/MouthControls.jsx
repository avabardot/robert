import React from 'react'
import Teeth from './Teeth'

export default function MouthControls(props) {
    return (
        <div className="electric_on_body mouth-grid mouth-droop">
            <div className="grid sub-mouth-1"></div>
            <Teeth {...props}/>
            <div className="grid sub-mouth-4"></div>
        </div>
    )
}
