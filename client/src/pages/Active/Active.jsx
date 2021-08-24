import React, { useState, useEffect } from "react";

import Navigation from "../../components/Navigation/Navigation";

import Head from "../../components/Head/Head";
import Tabs from "../../components/Tabs/Tabs";
import Loader from "../../components/Loader/Loader";
import Form from "../../components/Form/Form";

const Active =  () => {
    const [ active, set_active ] = useState( [] );
    const [ active_loading, set_active_loading ] = useState( true );
    useEffect( () => {
        fetch( "http://localhost:8000/get_forms/active", {
            headers: {
                "x-access-token": localStorage.getItem( "jsonwebtoken" )
            }
        } )
            .then( ( response ) => {
                return response.json();
            } )
            .then( ( array ) => {
                set_active( array );

                set_active_loading( false );
            } );
    }, [] );

    const remove_form = ( index ) => {
        set_active(
            active.filter ( form => form.id !== index )
        );
    }

    const [ value, set_value ] = useState( "" );
    const [ results, set_results ] = useState( [] );
    const [ results_loading, set_results_loading ] = useState( false );

    useEffect( () => {
        if ( value.length === 0 ) {
           return set_results( [] );
        }

        set_results_loading( true );

        fetch( "http://localhost:8000/search_forms/active", {
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
           <Head title="Активные заявки" subtitle="Здесь представленны активные заявки за всё время." quantity={ active.length } />

           <Tabs selected={ 0 } />

           <input className="search" type="text" placeholder="Поиск" value={ value } onChange={ ( event ) => {
               set_value( event.target.value.trim() );
           } } />

           {
               active_loading ? (
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
               ) : value.length === 0 && !results_loading ? active.map (
                   ( form, i ) => {
                       return (
                           <Form key={ i } form={ form } type="active" remove_form={ remove_form } />
                       );
                   }
               ) : null
           }
        </div>
    </>;
}

export default Active;