import React from "react";

import "./menu.scss";

import Radio from "../Radio/Radio";

const Menu = ( props ) => {
    return (
        <menu className="menu">
            <div className="menu__item">
                <img className="menu__head" src={ `https://mc-heads.net/avatar/${ props.username }/210` } alt={ props.username } />
                <p>{ props.username }</p>
            </div>
            <div className="menu__border" />
            <div className="menu__item" onClick={ () => {
                props.toggle_radio();

                document.body.classList.toggle( "dark" );

                if ( localStorage.getItem( "theme" ) === "dark" ) {
                    localStorage.setItem( "theme", "light" );
                } else if ( localStorage.getItem( "theme" ) === "light" ) {
                    localStorage.setItem( "theme", "dark" );
                }
            } }>
                <p className="mr">Тёмная тема</p>
                <Radio checked={ props.radio } />
            </div>
            <div className="menu__border" />
            <div className="menu__item" onClick={ () => {
                localStorage.removeItem( "jsonwebtoken" );

                window.location.reload();
            } }>
                <p>Выйти из аккаунта</p>
            </div>
        </menu>
    );
}

export default Menu;