import React from "react";

import "./loader.scss";

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__item">
                <div className="loader__content" style={ { width: 288 } } />
            </div>
            <div className="loader__border" />
            <div className="loader__item">
                <div className="loader__content" style={ { width: 112 } } />
                <div className="loader__content" style={ { width: 28 } } />
                <div className="loader__content mt" />
            </div>
            <div className="loader__border" />
            <div className="loader__item">
                <div className="loader__content" style={ { width: 56 } } />
                <div className="loader__content" style={ { width: 28 } } />
                <div className="loader__content mt" />
            </div>
            <div className="loader__border" />
            <div className="loader__item">
                <div className="loader__content" style={ { width: 168 } } />
                <div className="loader__content" style={ { width: 28 } } />
                <div className="loader__content mt" />
            </div>
            <div className="loader__border" />
            <div className="loader__item">
                <div className="loader__content" style={ { width: 112 } } />
                <div className="loader__content" style={ { width: 28 } } />
                <div className="loader__content mt" />
            </div>
            <div className="loader__border" />
            <div className="loader__item">
                <div className="loader__content" style={ { width: 112 } } />
                <div className="loader__content" style={ { width: 28 } } />
                <div className="loader__content mt" />
            </div>
        </div>
    );
}

export  default Loader;