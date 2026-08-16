import React from 'react'

export default function Lights() {
    return (
        <>
        <a-entity light="color: #fdfdfc; intensity: 2.5" position="-99.8987 88.1312 -214.88725" id="moonlight"></a-entity>
        <a-entity light="color: #fdfdfc; intensity: 2; target: #moon; penumbra: 1;" position="0 88.1312 214.88725" target="#moon" id="sun"></a-entity>
        <a-entity light="color: #000000; intensity: 0.5; type: hemisphere; groundColor: #0b1a28; penumbra: 0.8;" position="-99.8987 88.1312 -214.88725" id="moonLightambient" visible=""></a-entity>
        </>
    )
}
