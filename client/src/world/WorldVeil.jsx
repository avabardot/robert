import React from 'react';
import './WorldVeil.css';

// What you see between stepping through a roundel and arriving: the same
// portal, large, still turning. It covers the page while Robert's world is
// fetched and built, so there is never a flash of anything else.
export default function WorldVeil({ note = 'Travelling…', children }) {
    return (
        <div className="world-veil" role="status">
            <div className="world-veil-portal" aria-hidden="true">
                <div className="portal">
                    <div className="portal-ring portal-ring--outer" />
                    <div className="portal-ring portal-ring--middle" />
                    <div className="portal-ring portal-ring--inner" />
                    <div className="portal-eye" />
                </div>
            </div>
            <p className="world-veil-note">{note}</p>
            {children}
        </div>
    );
}
