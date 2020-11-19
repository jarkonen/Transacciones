'use strict'
import {app} from '../../../app.js';
import express from 'express';

const jwt = require('jsonwebtoken');
const rutasProtegidas = express.Router(); 
//app.use(require('.routes/index'));

rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, app.get('llave'), (err, decoded) => {      
        if (err) {
          return res.json({ mensaje: 'Token inválida' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.send({ 
          mensaje: 'Token no proveída.' 
      });
    }
 });

 export {rutasProtegidas};