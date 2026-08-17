import React from 'react'

export default function Clouds() {
    return (
        <a-sphere id="clouds" src="#skyImg" position="0.024 67.57567 -70.20451" geometry="primitive: sphere" rotation="0 0 0" color="#0ed2ec" material="color: #66d1ad; transparent: true; opacity: 0.2; shader: flat; side: double; height: 10000; width: 10000" scale="400 400 400" fog="color: #c63f3f; density: 0; type: exponential" animation="property: rotation; to: -360 -360 -360; dur: 800000; loop: true; easing: easeInQuad"></a-sphere>
    )
}
