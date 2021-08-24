import React, { useState, useEffect } from "react";

import Navigation from "../../components/Navigation/Navigation";

import Head from "../../components/Head/Head";
import Tabs from "../../components/Tabs/Tabs";
import Loader from "../../components/Loader/Loader";
import Form from "../../components/Form/Form";

const Rejected =  () => {
    const [ rejected, set_rejected ] = useState( [] );
    const [ rejected_loading, set_rejected_loading ] = useState( true );
    useEffect( () => {
        fetch( "http://localhost:8000/get_forms/rejected", {
            headers: {
                "x-access-token": localStorage.getItem( "jsonwebtoken" )
            }
        } )
            .then( ( response ) => {
                return response.json();
            } )
            .then( ( array ) => {
                set_rejected( array );

                set_rejected_loading( false );
            } );
    }, [] );

    const [ value, set_value ] = useState( "" );
    const [ results, set_results ] = useState( [] );
    const [ results_loading, set_results_loading ] = useState( false );

    useEffect( () => {
        if ( value.length === 0 ) {
            return set_results( [] );
        }

        set_results_loading( true );

        fetch( "http://localhost:8000/search_forms/rejected", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "x-access-token": localStorage.getItem( "jsonwebtoken" )
            },
            body: JSON.stringify( {
                "search_query": value
            } )
        } )
            .then( ( response ) => {
                return response.json();
            } )
            .then( ( array ) => {
                set_results( array );

                set_results_loading( false );
            } );
    }, [ value ] );

    return <>
        <Navigation />
        <div className="container">
            <Head title="Отклонённые заявки" subtitle="Здесь представленны отклонённые заявки за всё время." quantity={ rejected.length } />

            <Tabs selected={ 2 } />

            <input className="search" type="text" placeholder="Поиск" value={ value } onChange={ ( event ) => {
                set_value( event.target.value.trim() );
            } } />

            {
                rejected_loading ? (
                    <Loader />
                ) : results.length === 0 && value.length !== 0 && !results_loading ? (
                    <p className="search__results mt">Нет результатов</p>
                ) : results.length !== 0 && value.length !== 0 ? (
                    results.map (
                        ( form, i ) => {
                            return (
                                <Form key={ i } form={ form } type="active" />
                            );
                        }
                    )
                ) : value.length === 0 && !results_loading ? rejected.map (
                    ( form, i ) => {
                        return (
                            <Form key={ i } form={ form } type="rejected" />
                        );
                    }
                ) : null
            }
        </div>
    </>;
}

export default Rejected;