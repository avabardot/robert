import React from 'react';
import ParagraphHolder from './ParagraphHolder';
import HomeNav from '../NavigationComponent/HomeNav';

export default function GridHolder() {
    return (
        <div className="scenecontainer">
            <HomeNav/>
            <ParagraphHolder/>
        </div>
    )
}
