import React, { createContext, useReducer, useContext } from "react";

import {
    SET_ROBERT_MOOD_RETURNING,
    SET_PROJECT,
    RESET_ROBERT,
    DISPLAY_OBJECT,
    HIDE,
    SHOW,
    VALIDATE_VISITOR
    //ADD_POST,
    //ADD_FAVORITE,
    //UPDATE_FAVORITES,
    //REMOVE_FAVORITE,
    //LOADING
  } from "./actions";
  
const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
    switch (action.type) {
    case SET_ROBERT_MOOD_RETURNING:
      //apiCall();
        return {
          ...state,
          mood: action.mood,
          speech: action.speech
          //link: randomMood.link
        };
    case DISPLAY_OBJECT:
      return {
        ...state,
        yesNoButtons: action.yesNoButtons,
        displayButton: action.displayButton,
        showLink: action.showLink,
        displayLink: action.displayLink,
        linkName: action.linkName,
        speech: action.speech,
        title: action.title
      };
    case SET_PROJECT:
      return {
        ...state,
        title: action.title,
        link: action.link,
        description: action.description
      };
    case HIDE:
      return {
        ...state,
        display: {display: 'none'}
      };
    case SHOW:
      return {
        ...state,
        display: {display: 'flex'}
      };
    case RESET_ROBERT:
    return {
      ...state,
      mood: null,
      speech:"Would you like to see something else?",
      yesNoButtons: false,
      displayButton: true,
      display: {display:'flex'},
      link: null
    };
    case VALIDATE_VISITOR:
      return {
        ...state,
        awake: action.awake,
        returning: action.awake
      };
    default:
      return state;
    }
  };
  
  const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
      mood: null,
      newUserSpeech:"Hello, I'm Robert.  I'm your new Virtual Assistant but I'd like to think of us more as friends. Make sure your sound is on and come see what I've been working on!",
      speech:"Welcome Back",
      showLink: null,
      yesNoButtons: false,
      displayButton: true,
      display: {display:'flex'},
      displayLink: null,
      linkName: null,
      title:null,
      link:null,
      description:null,
      awake:null,
      returning: null
    });
  
    return <Provider value={[state, dispatch]} {...props} />;
  };
  
  const useStoreContext = () => {
    return useContext(StoreContext);
  };
  
export { StoreProvider, useStoreContext };
  