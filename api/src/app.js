const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const server = express();

// Middleware para manejar datos codificados en URL
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Middleware para manejar datos en formato JSON
server.use(bodyParser.json({ limit: '50mb' }));

server.use(cookieParser());

server.use(morgan('dev'));

// Configuración manual de cors
server.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', routes);

// Middleware para el manejo de errores (catch-all)
server.use((err, req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});


module.exports = server;