'use strict'

import {Transactions} from '../../modelos/transactions';
import {addt, retrievetransactionbyid, validate_transaction, retrievetransactionporusuaio} from '../../../src/services/transaction_services/transactions.services';
import {retrieveadmin, retrieve_id_user_token} from '../../../src/services/user_services/user.services';

const {check, validationResult} = require('express-validator');

const newTransValidator = [

    check('id_sender').exists(),
    check('id_reciver').exists(),
    check('amount').exists(),

];

const validateTransValidator = [

    check('id_transaction').exists(),
    check('token').exists(),

];

const rejectTransValidator = [

    check('id_transaction').exists(),
    check('token').exists(),

];

//Rechaza una transaccion

async function reject_Transaction(req, res) {

    let transac = await retrievetransactionbyid(req.body.id_transaction);
    let id_user = await retrieve_id_user_token(req.body.token);
    let usu = await retrieveadmin(id_user);
    if(usu.admin == true){

        transac.validated = -1;
        let id_pasada = req.body.id_pasada;
        if(id_pasada == transac.id_reciver){
            let bol = await validate_transaction(transac);
            return res.status(200).send(JSON.stringify({message : "La transaccion a sido rechazada ", bol}));
        }

    }else{

        transac.validated = -1;
        if(id_user == transac.id_reciver){
            let bol = await validate_transaction(transac);
            return res.status(200).send(JSON.stringify({message : "La transaccion a sido rechazada ", bol}));
        }

    }
    
}

//Valida una transaccion desde el recividor

async function validate_Transaction(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }else{

        let transac = await retrievetransactionbyid(req.body.id_transaction);
        let id_user = await retrieve_id_user_token(req.body.token);
        let usu = await retrieveadmin(id_user);
        if(usu.admin == true){
    
            transac.validated = 1;
            let id_pasada = datos.id_pasada;
            if(id_pasada == transac.id_reciver){
                let bol = await validate_transaction(transac);
                return res.status(200).send(JSON.stringify({message : "La transaccion a sido validada ", bol}));
            }
    
        }else{
    
            transac.validated = 1;
            if(id_user == transac.id_reciver){
                let bol = await validate_transaction(transac);
                return res.status(200).send(JSON.stringify({message : "La transaccion a sido validada ", bol}));
            }else{
                return res.status(200).send(JSON.stringify({message : "La transaccion no puede ser validada usuario incorrecto "}));
            }
    
        }
    
    }
    
}

//Crea una nueva transaccion

async function new_transaction(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }else{

        let _id_transaccion = await addt(create_Object_transaction(req.body));
        return res.status(200).send(JSON.stringify({message: "La transaccion se ha añadido correctamente ", _id_transaccion}));

    }
    
}

//Crea objetos transaccion

function create_Object_transaction(data) {
    
    let transaction = new Transactions(data.id_sender, data.id_reciver, data.amount, 0);
    return transaction;

}

async function all_Transactions_Validated(id) {

    let d = await retrievetransactionporusuaio(id);

    let bol = true;
    var x = d.length;
    for(var i = 0; i<x; i++){
        let transac = new Transactions();
        transac = d[i];
        console.log(transac.validated);
        if(bol == true && transac.validated == 1){
            continue;
        }if(transac.validated == 0){
            bol = false;
        }else{
            bol = false;
        }

    }
    console.log(bol);
    return bol;
    
}

export {new_transaction, validate_Transaction, reject_Transaction, all_Transactions_Validated, newTransValidator, validateTransValidator, rejectTransValidator};