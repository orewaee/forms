import React from "react";

import "./form.scss";

const Form = ( props ) => {
    return (
        <div className="form">
            <div className="form__header">
                <h5 className="form__datetime">{ props.form.datetime }</h5>
                <div className="form__wrapper mt">
                    <img className="form__head mr" src={ `https://mc-heads.net/avatar/${ props.form.username }/210` } alt={ props.form.username } />
                    <h3 className="form__title">Заявка №{ props.form.id } от { props.form.username }</h3>
                </div>
            </div>
            <div className="form__border" />
            <div className="form__item">
                <h3 className="form__question">Ваш игровой никнейм?</h3>
                <p className="form__answer mt">{ props.form.questions.first }</p>
            </div>
            <div className="form__border" />
            <div className="form__item">
                <h3 className="form__question">Ваш полный возраст?</h3>
                <p className="form__answer mt">{ props.form.questions.second }</p>
            </div>
            <div className="form__border" />
            <div className="form__item">
                <h3 className="form__question">Имеете ли вы Twitch или YouTube канал?</h3>
                <p className="form__answer mt">{ props.form.questions.third }</p>
            </div>
            <div className="form__border" />
            <div className="form__item">
                <h3 className="form__question">Играли ли вы до этого момента на других приватных серверах? Что послужило причиной ухода с предыдущего сервера?</h3>
                <p className="form__answer mt">{ props.form.questions.fourth }</p>
            </div>
            <div className="form__border" />
            <div className="form__item">
                <h3 className="form__question">Как, и от кого вы узнали про этот сервер, и им заинтересовались? Если от друга то укажите его никнейм на сервере.</h3>
                <p className="form__answer mt">{ props.form.questions.fifth }</p>
            </div>
            <div className="form__border" />
            <div className="form__item">
                <h3 className="form__question">Почему вы выбрали именно нас?</h3>
                <p className="form__answer mt">{ props.form.questions.sixth }</p>
            </div>
            {
                props.type === "active" ? <>
                    <div className="form__border" />
                    <div className="form__actions">
                        <button className="form__button" onClick={ () => {
                            fetch( "http://localhost:8000/accept_active", {
                                method: "POST",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "x-access-token": localStorage.getItem( "jsonwebtoken" )
                                },
                                body: JSON.stringify( {
                                    "id": props.form.id
                                } )
                            } )
                                .then( ( response ) => {
                                    return response.json();
                                } )
                                .then( ( accepted ) => {
                                    if ( accepted.accepted ) {
                                        props.remove_form( props.form.id );
                                    }
                                } );
                        } }>Принять</button>
                        <button className="form__button" onClick={ () => {
                            fetch( "http://localhost:8000/reject_active", {
                                method: "POST",
                                headers: {
                                    "Accept": "application/json",
                                    "Content-Type": "application/json",
                                    "x-access-token": localStorage.getItem( "jsonwebtoken" )
                                },
                                body: JSON.stringify( {
                                    "id": props.form.id
                                } )
                            } )
                                .then( ( response ) => {
                                    return response.json();
                                } )
                                .then( ( rejected ) => {
                                    if ( rejected.rejected ) {
                                        props.remove_form( props.form.id );
                                    }
                                } );

                            console.log( "Отклонить", props.form.id );
                        } }>Отклонить</button>
                    </div>
                </> : null
            }
        </div>
    );
}

export default Form;