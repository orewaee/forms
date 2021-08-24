import React from "react";

import "./radio.scss";

const Radio = ( props ) => {
    return (
        <div className={ props.checked ? "radio active" : "radio" }>
            <div className="radio__item" />
        </div>
    );
}

export default Radio;