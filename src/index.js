'use strict'
import {app} from './app.js';
import {rutasProtegidas} from './services/security_services/security/protectedroutes.js';
import {check_User, update_user, delete_User, add_User, registerValidator, updateValidator, deleteValidator} from './controller/controller.users/users.methods';
import {new_transaction, validate_Transaction, reject_Transaction, newTransValidator, validateTransValidator, rejectTransValidator} from './controller/controller.transactions/transactions.methods';

const port = 4000;

/*app.get('/',(req, res) =>{

    res.status(200).send(JSON.stringify({
        message : "Hola mundo"
    }));

});*/

app.listen(4000, () => {

    console.log(`Servidor corriendo en el puerto ${port}`);

});

//Autentificacion de usuarios

//app.get('/auth', check_User);


