import React from "react";

import "./header.scss";

const Header = ( props ) => {


    return (
        <header>
            <div className="header__item" onClick={ props.toggle_menu }>
                <img className="header__head" src={ `https://mc-heads.net/avatar/${ props.username }/210` } alt={ props.username } />
                <svg className="header__chevron" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12L14 16L18 12" stroke="var( --fc_rd )" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </header>
    );
}

export default Header;