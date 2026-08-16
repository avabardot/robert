import React from 'react';

export default function Buttons() {
    return (
        <a-entity position="30 40 -100" geometry="primitive: torus; radiusTubular: 0.1" id="button" material="color: #a93232" scale="5 5 5" rotation="29.999999999999996 -10 -25"><a-entity geometry="primitive: sphere; phiLength: 180" material="color: #6d1212" id="buttonback" position="0 0 -0.4"></a-entity><a-entity position="-0.3 -0.2 0.6" geometry="primitive: cone; height: 0.2; radiusBottom: 0.15" rotation="-95 190 180" material="blending: subtractive; opacity: 0" id="buttonhole"></a-entity><a-entity position="0.3 -0.2 0.6" geometry="primitive: cone; height: 0.2; radiusBottom: 0.15" rotation="-95 190 180" material="blending: subtractive; opacity: 0" id="buttonhole"></a-entity><a-entity position="-0.3 0.2 0.61" geometry="primitive: cone; height: 0.2; radiusBottom: 0.15" rotation="-95 190 180" material="blending: subtractive; opacity: 0" id="buttonhole"></a-entity><a-entity position="0.3 0.2 0.6" geometry="primitive: cone; height: 0.2; radiusBottom: 0.15" rotation="-95 190 180" material="blending: subtractive; opacity: 0" id="buttonhole"></a-entity></a-entity>
    )
}
