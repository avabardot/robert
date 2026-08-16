import React from 'react';
import { Link } from "react-router-dom";

export default function HomeNav() {
    return (
        <>
        <Link  className="bottom-market" to="/" style={{cursor:'pointer', color:'yellow', fontSize:'3em'}}><i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
        </>
    )
}