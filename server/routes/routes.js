require( "dotenv" ).config();

const express = require( "express" );
const router = express.Router();

const mysql = require( "mysql" );

const bcryptjs = require( "bcryptjs" );
const jsonwebtoken = require( "jsonwebtoken" );

var connection = mysql.createConnection( {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
} );

connection.connect( ( errors ) => {
    if ( errors ) return console.error( "\x1b[31m Error while connecting to database:", errors + "\x1b[0m" );
} );

const verify = ( request, response, next ) => {
    const access_token = request.headers[ "x-access-token" ];

    if ( !access_token ) return response.status( 401 ).json( {
        authorization_status: false,
        error: {
            status: 401,
            message: "Отсутствует access токен."
        }
    } );

    jsonwebtoken.verify( access_token, process.env.access_secret, ( error, decoded ) => {
        if ( error ) return response.status( 401 ).json( {
            authorization_status: false,
            error: {
                status: 401,
                message: "Ошибка jsonwebtoken."
            }
        } );

        if ( Date.now() >= decoded.exp * 1000 ) return response.status( 401 ).json( {
            authorization_status: false,
            error: {
                status: 401,
                message: "Истёк срок действия access токена."
            }
        } );

        request.username = decoded.username;

        next();
    } );
}

router.post( "/login", ( request, response ) => {
    const username = request.body.username;
    const password = request.body.password;

    connection.query( "SELECT * FROM `users` WHERE `username` = ?", [ username ], ( error, result ) => {
        if ( error ) return response.status( 501 ).json( {
            authorization_status: false,
            error: {
                status: 501,
                message: "Ошибка при запросе в базу данных."
            }
        } );

        if ( result.length !== 1 ) return response.status( 401 ).json( {
            authorization_status: false,
            error: {
                status: 401,
                message: "Ошибка авторизации."
            }
        } );

        bcryptjs.compare( password, result[ 0 ].password, ( err, res ) => {
            if ( err ) return response.status( 401 ).json( {
                authorization_status: false,
                error: {
                    status: 401,
                    message: "Ошибка bcryptjs."
                }
            } );

            if ( !res ) return response.status( 401 ).json( {
                authorization_status: false,
                error: {
                    status: 401,
                    message: "Неверный пароль."
                }
            } );

            const id = result[0].id;
            const username = result[0].username;

            const access_token = jsonwebtoken.sign( { id, username }, process.env.access_secret, { expiresIn: "4h" } );

            return response.status( 200 ).json( {
                authorization_status: true,
                access_token
            } );
        } );
    } );
} );

router.get( "/login", verify, ( request, response ) => {
    response.status( 200 ).json( {
        authorization_status: true
    } );
} );

router.get( "/get_username", verify, ( request, response ) => {
    response.status( 200 ).send( request.username );
} );

router.get( "/get_forms/:type", verify, ( request, response ) => {
    connection.query( "SELECT * FROM `forms` WHERE `status` = ?", [ request.params.type ], ( error, result ) => {
        if ( error ) return response.status( 501 ).json( {
            authorization_status: false,
            error: {
                status: 501,
                message: "Ошибка при запросе в базу данных."
            }
        } );

        let array = [];

        result.map (
            ( item, i ) => {
                array.unshift (
                    {
                        datetime: item.datetime,
                        id: item.id,
                        username: item.username,
                        questions: {
                            first: item.first,
                            second: item.second,
                            third: item.third,
                            fourth: item.fourth,
                            fifth: item.fifth,
                            sixth: item.sixth,
                        }
                    }
                );
            }
        );

        response.status( 200 ).send( array );
    } );
} );

router.post( "/search_forms/:type", verify, ( request, response ) => {
    const search_query = request.body.search_query;

    connection.query( "SELECT * FROM `forms` WHERE `status` = ? AND `username` LIKE ? OR `status` = ? AND `id` LIKE ?", [ request.params.type, `${ search_query }%`, request.params.type, `${ search_query }%` ], ( error, result ) => {
        if ( error ) return response.status( 501 ).json( {
            authorization_status: false,
            error: {
                status: 501,
                message: "Ошибка при запросе в базу данных."
            }
        } );

        let array = [];

        result.map (
            ( item, i ) => {
                array.unshift (
                    {
                        datetime: item.datetime,
                        id: item.id,
                        username: item.username,
                        questions: {
                            first: item.first,
                            second: item.second,
                            third: item.third,
                            fourth: item.fourth,
                            fifth: item.fifth,
                            sixth: item.sixth,
                        }
                    }
                );
            }
        );

        response.status( 200 ).send( array );
    } );
} );

router.post( "/accept_active", verify, ( request, response ) => {
    const id = request.body.id;

    connection.query( "UPDATE `forms` SET `status` = 'accepted' WHERE `id` = ?", [ id ], ( error ) => {
        if ( error ) return response.status( 501 ).json( {
            authorization_status: false,
            error: {
                status: 501,
                message: "Ошибка при запросе в базу данных."
            }
        } );

        response.status( 200 ).json();
    } );

    response.status( 200 ).json( {
        accepted: true
    } );
} );

router.post( "/reject_active", verify, ( request, response ) => {
    const id = request.body.id;

    connection.query( "UPDATE `forms` SET `status` = 'rejected' WHERE `id` = ?", [ id ], ( error ) => {
        if ( error ) return response.status( 501 ).json( {
            authorization_status: false,
            error: {
                status: 501,
                message: "Ошибка при запросе в базу данных."
            }
        } );

        response.status( 200 ).json();
    } );

    response.status( 200 ).json( {
        rejected: true
    } );
} );

module.exports = router;