import React from 'react'
import TopPlanter from './TopPlanter'
import BottomPlanter from './BottomPlanter'

export default function RobertPlanter(props) {
    return (
        <div className="planter-grid">
            <div className="grid sub-planter-1"></div>
            <div className="grid sub-planter-2">
                <TopPlanter {...props}/>
            </div>
            <div className="grid sub-planter-3"></div>
            <div className="grid sub-planter-4">
                <BottomPlanter {...props}/>
            </div>
        </div>
    )
}
