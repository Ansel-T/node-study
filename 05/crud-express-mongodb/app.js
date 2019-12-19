const express = require('express');
const router = require('./router/router');
const bodyParser = require('body-parser');``

const app = express();

app.engine('html', require('express-art-template'));
app.use('/node_modules/',express.static('./node_modules'));
app.use('/public/',express.static('./public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(router);

app.listen('3000',function () {
    console.log('running server...');
})