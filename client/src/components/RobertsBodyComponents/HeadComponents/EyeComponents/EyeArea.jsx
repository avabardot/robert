import React from 'react'
import EyeballControls from './EyeballControls'

export default function EyeArea(props) {
    return (
        <div className="grid sub-head-26">
            <div className="eyeball-grid">
                <div className="eyeball-sub-1 grid"></div>
                <div className="eyeball-sub-2 grid"></div>
                <div className="eyeball-sub-3 grid"></div>
                <div className="eyeball-sub-4 grid">
                    <EyeballControls {...props}/>
                </div>
                <div className="eyeball-sub-5 grid"></div>
            </div>
        </div>
    )
}
