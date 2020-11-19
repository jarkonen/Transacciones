'use strict'
import express from 'express';

const app = express();
const bodyParser = require('body-parser');
const config = require('./services/security_services/security/config');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.get(require('./routes/routes'));

app.set('llave', config.llave);

export{app};