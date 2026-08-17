import React from 'react'

export default function Controls() {
    return (
    <a-camera camera="" position="0 3 5" rotation="11.000789666511789 9.396507840145324 0">
        <a-cursor animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 3 3 3; to: 5 5 5"
        animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 5 5 5; to: 3 3 3"
        animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 5 5 5"
        cursor="fuse: true;"
        material="color: white; shader: flat"
        position="0 0 -3"
        geometry="primitive: ring"></a-cursor>
    </a-camera>
    )
}
