import React from 'react';
import RobertHead from './HeadComponents/RobertHead';
import ActivityGrid from './ActivityComponents/ActivityGrid'
import RobertStem from './StemComponents/RobertStem'
import RobertPlanter from './PlanterComponents/RobertPlanter'


export default function RobertsBody(props) {
    return (
        <div className=" grid green_light_grid grid-container-2">
            <div className= "electric_on subgrid">
                <div className="fade-in-second grid subgrid-1 green_one"></div>
                <div className="fade-in-fifth grid subgrid-2">
                   <RobertHead {...props}/>
                </div>
                <div className="grid fade-in-second green_two subgrid-3">
                    <ActivityGrid {...props}/>
                </div>
                <div className="grid fade-in-second green_three subgrid-4"></div>
                <div className="grid subgrid-5">
                    <RobertStem {...props}/>
                </div>
                <div className="grid green_four fade-in-second subgrid-6">
                    <ActivityGrid {...props}/>
                </div>
                <div className="grid fade-in-second green_five subgrid-7"></div>
                <div className="grid fade-in-third subgrid-8">
                    <RobertPlanter {...props}/>
                </div>
                <div className="grid fade-in-second green_six subgrid-9">
                    <ActivityGrid {...props}/>
                </div>
            </div>
        </div>
    )
}
