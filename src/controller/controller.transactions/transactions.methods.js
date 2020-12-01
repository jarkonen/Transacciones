'use strict'

import {Transactions} from '../../modelos/transactions';
import {addt, RetrieveTransactionById, validate_transaction, retrievetransactionporusuaio} from '../../../src/services/transaction_services/transactions.services';
import {RetriveUserById, RetriveUserIdByToken} from '../../../src/services/user_services/user.services';

const {check, validationResult} = require('express-validator');

const newTransValidator = [

    check('transaction.id_sender').exists(),
    check('transaction.id_reciver').exists(),
    check('transaction.amount').exists(),

];

const validateTransValidator = [

    check('transaction.id_transaction').exists(),
    check('token').exists(),

];

const rejectTransValidator = [

    check('transaction.id_transaction').exists(),
    check('token').exists(),

];

//Rechaza una transaccion

async function Reject_Transaction(req, res) {

    let transac = await RetrieveTransactionById(req.body.transaction.id_transaction);
    let id_user = await RetriveUserIdByToken(req.body.token);
    let usu = await RetriveUserById(id_user);
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

async function Validate_Transaction(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }else{

        let transac = await RetrieveTransactionById(req.body.transaction.id_transaction);
        let id_user = await RetriveUserIdByToken(req.body.token);
        let usu = await RetriveUserById(id_user);
        if(usu.admin == true){
    
            transac.validated = 1;
            let id_pasada = datos.id_pasada;
            if(id_pasada == transac.id_reciver){
                let BOL = await validate_transaction(transac);
                return res.status(200).send(JSON.stringify({message : "La transaccion a sido validada ", BOL}));
            }
    
        }else{
    
            transac.validated = 1;
            if(id_user == transac.id_reciver){
                let BOL = await validate_transaction(transac);
                return res.status(200).send(JSON.stringify({message : "La transaccion a sido validada ", BOL}));
            }else{
                return res.status(200).send(JSON.stringify({message : "La transaccion no puede ser validada usuario incorrecto "}));
            }
    
        }
    
    }
    
}

//Crea una nueva transaccion

async function New_Transaction(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }else{

        let _id_transaccion = await addt(create_Object_transaction(req.body.transaction));
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

    let BOL = true;
    var x = d.length;
    for(var i = 0; i<x; i++){
        let transac = new Transactions();
        transac = d[i];
        console.log(transac.validated);
        if(BOL == true && transac.validated == 1){
            continue;
        }if(transac.validated == 0){
            BOL = false;
        }else{
            BOL = false;
        }

    }
    console.log(BOL);
    return BOL;
    
}

export {New_Transaction, Validate_Transaction, Reject_Transaction, all_Transactions_Validated, newTransValidator, validateTransValidator, rejectTransValidator};