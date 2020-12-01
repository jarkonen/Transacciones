'use strict'
import {app} from './app.js';
require ('dotenv').config();

const port = process.env.PORT ;

app.listen(5000, () => {

    console.log(`Servidor corriendo en el puerto ${port}`);

});



