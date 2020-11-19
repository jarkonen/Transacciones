'use strict'
import {app} from '../app.js';
import {rutasProtegidas} from '../services/security_services/security/protectedroutes.js';
import {check_User, update_user, delete_User, add_User, registerValidator, updateValidator, deleteValidator} from '../controller/controller.users/users.methods';
import {new_transaction, validate_Transaction, reject_Transaction, newTransValidator, validateTransValidator, rejectTransValidator} from '../controller/controller.transactions/transactions.methods';

app.get('/',(req, res) =>{

    res.status(200).send(JSON.stringify({
        message : "Hola mundo"
    }));

});

/*app.listen(4000, () => {

    console.log(`Servidor corriendo en el puerto 4000`);

});*/

app.get('/auth', check_User);

//Registro de un nuevo usuario

app.post('/users/new', registerValidator, add_User);

//Update de un usuario registrado

app.post('/users/update', updateValidator, rutasProtegidas, update_user);

//Borra un usuario

app.post('/users/delete', deleteValidator, rutasProtegidas, delete_User);

//registro de una nueva transaccion

app.post('/transactions/new',newTransValidator, rutasProtegidas, new_transaction);

//valida una transaccion

app.post('/transactions/validate',validateTransValidator, rutasProtegidas, validate_Transaction);

//rechaza una transaccion

app.post('/transactions/reject', rejectTransValidator, rutasProtegidas, reject_Transaction);

