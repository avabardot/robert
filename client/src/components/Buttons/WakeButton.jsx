import React from 'react';
import { useStoreContext } from "../../services/GlobalState";
import { VALIDATE_VISITOR } from "../../services/actions";

export default function WakeButton() {

const [state, dispatch] = useStoreContext();

let returningStatus;

function generateUserId() {
    let userId = new Uint32Array(1);
    window.crypto.getRandomValues(userId);
    //console.log(userId);
    return userId;
}

function generateNow() {
    let now = new Date();
    now.setMonth( now.getMonth() + 1 );
    return now;
}

function writeCookie() {
    let userId = generateUserId();
    let now = generateNow();
    document.cookie=`id= ${userId};`
    document.cookie=`expires= ${now.toUTCString()};`
}
    
function readCookie() {
    let currentCookie = document.cookie;
    if(currentCookie === "") {
        //console.log("hello")
        writeCookie();
        //console.log(document.cookie);
        returningStatus = false;
    } else {
        //console.log("welcome back")
        returningStatus = true;
    }
}

  //Code for Robert's Glowing Open Eye

  function wakeRobert() {
      const  wakeUp = true;
    dispatch({
        type: VALIDATE_VISITOR,
        awake: wakeUp,
        returning: returningStatus
      });
  }
  ////console.log(state.awake)

  //If new user robert introduction
  function speakRobertSpeak() {
    if(returningStatus !== true) {
    let robertMsg = new SpeechSynthesisUtterance();
    robertMsg.text = "Hello, I'm Robert.  I'm an artist. Make sure your sound is on and come see what I've been working on!";
    window.speechSynthesis.speak(robertMsg);
    }
  }

  function wakingRobert() {
    readCookie();
    wakeRobert();
    speakRobertSpeak();
  }

  if(state.awake !== true) 
    return (
        <>
        <button className ="WakeButton color-vibrate" onClick={wakingRobert}>Wake Robert</button>
        </>
    )
    return (
        null
    )
}
