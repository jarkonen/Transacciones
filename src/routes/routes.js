'use strict'
import {app} from '../app.js';
import {rutasProtegidas} from '../services/security_services/security/protectedroutes.js';
import {check_User, update_User, Delete_User, add_User, registerValidator, updateValidator, deleteValidator} from '../controller/controller.users/users.methods';
import {New_Transaction, Validate_Transaction, Reject_Transaction, newTransValidator, validateTransValidator, rejectTransValidator} from '../controller/controller.transactions/transactions.methods';

app.get('/',(req, res) =>{

    res.status(200).send(JSON.stringify({
        message : "Hola mundo"
    }));

});

app.post('/auth', check_User);

//Registro de un nuevo usuario

app.post('/users/new', registerValidator, add_User);

//Update de un usuario registrado

app.post('/users/update', updateValidator, rutasProtegidas, update_User);

//Borra un usuario

app.post('/users/delete', deleteValidator, rutasProtegidas, Delete_User);

//registro de una nueva transaccion

app.post('/transactions/new',newTransValidator, rutasProtegidas, New_Transaction);

//valida una transaccion

app.post('/transactions/validate',validateTransValidator, rutasProtegidas, Validate_Transaction);

//rechaza una transaccion

app.post('/transactions/reject', rejectTransValidator, rutasProtegidas, Reject_Transaction);

