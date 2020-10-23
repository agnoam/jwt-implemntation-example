'use strict'

/************* Moduls **************/
, express = require('express')
, bodyParser = require('body-parser')
, os = require('os');

var app = express();
const port = process.env.PORT || 8080;

/************* Middlewares **************/
app.use( bodyParser.json() );

// app.use('./middlewares/server.middelware');

/************* API **************/
require('./config/routes.config')(app);

app.listen(port, ()=>{
    console.log(`Server running on http://${os.hostname}:${port}`);
});