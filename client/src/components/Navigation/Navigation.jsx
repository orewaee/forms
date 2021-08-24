import React, { useState, useEffect } from "react";

import Header from "../Header/Header";
import Menu from "../Menu/Menu";

import axios from "axios";

const Navigation = () => {
    const [ username, set_username ] = useState( "Steve" );

    useEffect( () => {
        axios.get( "http://localhost:8000/get_username", {
            headers: {
                "x-access-token": localStorage.getItem( "jsonwebtoken" )
            }
        } )
            .then( ( response ) => {
                set_username( response.data );
            } );

        axios.get( "" )
    }, [] );

    let initial_state;

    if ( localStorage.getItem( "dark" ) === "true" ) {
        initial_state = true;
    } else if ( localStorage.getItem( "dark" ) === "false" ) {
        initial_state = false;
    }

    const [ radio, set_radio ] = useState( initial_state );

    const toggle_radio = () => {
        set_radio( !radio );

        localStorage.setItem( "dark", !radio );
    }

    const [ menu, set_menu ] = useState( false );

    const toggle_menu = () => {
        if ( !menu ) {
            set_menu( true );
        }

        if ( menu ) {
            let menu = document.querySelector( ".menu" );

            menu.style.transform = "translateY( -16px )";
            menu.style.opacity = 0;

            setTimeout( () => {
                set_menu( false );
            }, 280 );
        }
    }

    return (
        <nav className="navigation">
            <Header username={ username } toggle_menu={ toggle_menu } />

            {
                menu ? ( <Menu username={ username } radio={ radio } toggle_radio={ toggle_radio } /> ) : null
            }
        </nav>
    );
}

export default Navigation;