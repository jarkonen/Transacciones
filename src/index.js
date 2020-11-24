'use strict'
import {app} from './app.js';
require ('dotenv').config();

const port = process.env.PORT || 4000;

app.listen(4000, () => {

    console.log(`Servidor corriendo en el puerto ${port}`);

});



