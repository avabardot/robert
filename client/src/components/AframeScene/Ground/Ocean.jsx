import React from 'react'

export default function Ocean() {
    return (
        <>
            <a-entity id="ocean" position="0 -2 -25" ocean="density: 50;    width: 200; depth: 200; speed: 2" src="#oceanImg"  material="color: #1f2d32; opacity: 0.75; roughness: 1;   displacementBias: 0.51; emissive: #010304; blending:  additive" rotation="-90 0 0"></a-entity>
            <a-plane src="#groundImg" id="oceanFloor"   wireframelinewidth="0" repeat="50 50" position="0 -20 -25"    geometry="primitive: circle; radius: 200" rotation="-90 0 0"   material="color: #000000; emissive: #000000; flatShading:     true; metalness: 1; roughness: 0.9" visible=""></a-plane>
        </>    
    )
}
