import React from 'react'
//import {RiMarkov} from 'rita'
import SwanSong from '../components/SongComponents/SwanSong';
import LyricalMiracle from '../components/SongComponents/LyricalMiracle';
import Controls from '../components/AframeScene/Controls/Controls';
import ParticleSystem from '../components/AframeScene/Sky/ParticleSystem';
import Ocean from '../components/AframeScene/Ground/Ocean';
import Clouds from '../components/AframeScene/Sky/Clouds';
import TheSky from '../components/AframeScene/Sky/TheSky';
import Moon from '../components/AframeScene/Sky/Moon';
import Buttons from '../components/AframeScene/Sky/Buttons';
import Lights from '../components/AframeScene/Lighting/Lights';
import StartButton from '../components/AframeScene/Controls/StartButton';

//import * as Tone from 'tone';

export default function World() {

    return (
        <a-scene loading-screen="dotsColor: red; backgroundColor: #010000">
            {/*
              Every texture in here used to be hotlinked through
              cors-anywhere.herokuapp.com, which stopped serving the public in
              2021, and the font came from rawgit.com, which shut down in 2019.
              The world now loads its own assets out of client/public/assets.
            */}
            <a-assets>
                <a-asset-item id="optimerBoldFont" src="https://cdn.jsdelivr.net/npm/three@0.150.1/examples/fonts/optimer_bold.typeface.json"></a-asset-item>
                <img id="dataImg" preload="auto" crossOrigin="anonymous" alt="" ></img>
                <img id="skyImg" crossOrigin="anonymous" preload="auto" alt="" src="https://aframe.io/sample-assets/assets/images/space/earth_clouds_2048.png"></img>
                <img id="strawberryImg" crossOrigin="anonymous" preload="auto" alt="" src="/assets/strawberry.svg"></img>
                <img id="lemonimg" crossOrigin="anonymous" preload="auto" alt="" src="/assets/flowers.jpeg"></img>
                <img id="strawberry" crossOrigin="anonymous" preload="auto" alt="" src="/assets/strawberry.svg"></img>
                <img id="flowers" crossOrigin="anonymous" preload="auto" alt="" src="/assets/flowers.jpeg"></img>
            </a-assets>
            <Controls/>
            <ParticleSystem/>
            <Moon/>
            <Buttons/>
            <Lights/>
            <LyricalMiracle/>
            <a-entity id="lemon" position="0 -0.84073 0" geometry="primitive: cone; height: 2; radiusBottom: 5" rotation="180 160 0" material="src: #lemonimg; flatshading: true; roughness: 1; emissive: #010000"></a-entity>
            <a-entity id="NavPortal" rotation="-56.47104820034774 -165.10325225096832 -1.4395342622991512e-15" position="0 5.937 90.10055" link="href:  /;  title:  HOME;  visualAspectEnabled:  true;  backgroundColor:  #965640;  highlighted:  true;  peekMode:  true;  titleColor:  #f21818;  highlightedColor:  #965640;  borderColor:  #965640" material="shader:  portal;  side:  double;  backgroundColor:  #965640;  strokeColor:  #965640;  opacity:  0.8;  transparent:  true; pano: #lemon" geometry="primitive: circle; radius: 10; segments: 64" scale="1 1 1"><a href="/">HOME</a> <a-entity text="align: center; value: NOEXIT; width: 30; wrapCount: 6.5" position="0 8.7781 -0.30295" id="NOEXIT"></a-entity><a-entity geometry="primitive: cylinder; height: 6; radius: 15" material="shader: portal; side: double; opacity: 0.8; transparent: true; backgroundColor: #965640; strokeColor: #965640" id="spherewindow"></a-entity><a-entity position="0 0 15" geometry="height: 5; width: 4" material="shader: portal; side: double; opacity: 0.8; transparent: true; backgroundColor: #16100e; strokeColor: #140d0a" id="door" visible="" position="0 0 15"></a-entity><a-entity position="-12.38423 5.79416 -0.39341" id="NOEXIT" text-geometry="bevelSize: 12; bevelThickness: 20; curveSegments: 20; height: 10; size: 5; value: NO EXIT" material="blending: additive; color: #6c2d2d; emissive: #000000; metalness: 0.3; roughness: 0"></a-entity></a-entity>
            <Ocean/>
            <TheSky/>
            <Clouds/>
            <SwanSong/>
            <StartButton/>
        </a-scene>
    )
}











//<a-entity id="robertpanel" position="-0.01 3 0.5" geometry="height: 4; width: 6"><a-entity id="robertwant" text__want_text="height:  4;  value:  I think Robert wants to sing you a song...perhaps try hovering over a strawberry?;  width:  4;  align:  center;  zOffset:  1"></a-entity></a-entity>