import React from "react";

import "./head.scss";

const Head = ( props ) => {
    return (
        <div className="head mt">
            <div className="head__item">
                <h3 className="head__title">{ props.title } <span className="head__quantity">{ props.quantity }</span></h3>
                <p className="head__subtitle mt">{ props.subtitle }</p>
            </div>
        </div>
    );
}

export default Head;