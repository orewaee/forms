import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import "./assets/scss/main.scss";
import "./assets/scss/auxiliary.scss";

import Active from "./pages/Active/Active";
import Accepted from "./pages/Accepted/Accepted";
import Rejected from "./pages/Rejected/Rejected";

import Login from "./pages/Login/Login";

import axios from "axios";

const App = () => {
    const [ status, set_status ] = useState( false );

    useEffect( () => {
        let theme = localStorage.getItem( "dark" );

        if ( theme === "true" ) {
            document.body.classList.add( "dark" );
        }

        axios.get( "http://localhost:8000/login", {
            headers: {
                "x-access-token": localStorage.getItem( "jsonwebtoken" )
            }
        } )
            .then( ( response ) => {
                if ( !response.data.authorization_status ) {
                    return;
                }

                set_status( true );
            } );
    }, [] )

    return (
        <Router>
            {
                status ? (
                    <Switch>
                        <Route path="/" exact>
                            <Active />
                        </Route>
                        <Route path="/accepted" exact>
                            <Accepted />
                        </Route>
                        <Route path="/rejected" exact>
                            <Rejected />
                        </Route>
                    </Switch>
                ) : (
                    <Switch>
                        <Route path="/" exact>
                            <Login />
                        </Route>
                    </Switch>
                )
            }
        </Router>
    );
}

export default App;