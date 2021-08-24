require( "dotenv" ).config();

const express = require( "express" );

const app = express();

const body_parser = require( "body-parser" );

const cors = require( "cors" );

const mysql = require( "mysql" );

app.use( express.json() );

app.use( body_parser.urlencoded( {
    extended: true
} ) );

app.use(
    cors(
        {
            origin: [
                "http://localhost:3000"
            ],
            methods: [
                "GET",
                "POST"
            ],
            credentials: true
        }
    )
);

app.use( "/", require( "./routes/routes" ) );

const port = process.env.port || 2121;

const run = () => {
    console.log( "\x1b[33m" + `The application runs on port ${ port } ...` + "\x1b[0m" );

    var connection = mysql.createConnection( {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    } );

    connection.connect( ( errors ) => {
        if ( errors ) return console.error( "\x1b[31m" + `Application launch error on port ${ port }:`, errors + "\x1b[0m" );
    } );

    app.listen( port, () => {
        console.log( "\x1b[32m" + `Application successfully launched on port ${ port }` + "\x1b[0m" );
    } );
}

run();