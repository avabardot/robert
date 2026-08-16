import React from 'react'

export default function RobertStem(props) {
    return (
        <div className="planter-body-grid">
            <div className="grid sub-planter-body-1"></div>
            <div className="grid electric_on_body sub-planter-body-2">
                <div className="plant-stem pulsate-fwd"></div>
            </div>
            <div className="grid sub-planter-body-3"></div>
            <div className="grid sub-planter-body-4 fade-in-fourth">
                <div className="electric_on_body plant-leaf leaf-twitch"></div>
            </div>
            <div className="grid sub-planter-body-5"></div>
        </div>
    )
}
