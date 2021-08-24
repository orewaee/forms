import React, { useState } from "react";

import "./login.scss";

import axios from "axios";

const Login = () => {
    const [ username, set_username ] = useState( "" );
    const [ password, set_password ] = useState( "" );

    return (
        <div className="login">
            <input className="login__username" type="text" placeholder="Имя" value={ username } onChange={ ( event ) => {
                set_username( event.target.value.trim() );
            } } />

            <input className="login__password" type="password" placeholder="Пароль" value={ password } onChange={ ( event ) => {
                set_password( event.target.value.trim() );
            } } />

            <button className="login__button mt" onClick={ ( event ) => {
                if ( username.length === 0 || password.length === 0 ) {
                    return event.preventDefault();
                }

                axios.post( "http://localhost:8000/login", {
                    username,
                    password
                } )
                    .then( ( response ) => {
                        if ( !response.data.authorization_status ) {
                            return document.body.style.backgroundColor = "#D34136";
                        }

                        localStorage.setItem( "jsonwebtoken", response.data.access_token );

                        window.location.reload();
                    } );
            } }>Войти</button>
        </div>
    );
}

export default Login;