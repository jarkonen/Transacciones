'use strict'

import {ConectDataBase, CloseConectionDataBase} from '../../services/mongo_service/conection';
import MongoClient from 'mongodb';
import {sendMail, RetriveUserById} from '../../../src/services/user_services/user.services';
import { Observable } from "rxjs";

//Create transaction

var events = require('events');
var em = new events.EventEmitter();
var userEmail, opcion;

async function rellenaobservable(idtransac){

    userEmail = await retrieveuseremailtransactionbyid(idtransac);
    return userEmail;

}

const observable = new Observable(observer => {

    observer.next(sendMail(userEmail,opcion));
    observer.complete();
    
}); 

async function addt(transactions)
{

        let collection = await ConectDataBase("APIRest", "Transactions");
        try {

            console.log("El usuario " + transactions.id_sender + " y el usuario_recividor " + transactions.id_reciver + " tienen una transaccion pendiente de " + transactions.amount); 
            let variable = await collection.insertOne({"id_sender": transactions.id_sender, "id_reciver": transactions.id_reciver, "amount": transactions.amount, "validated": 0});
            CloseConectionDataBase();
            return variable.insertedId;
            }catch (e) {console.error(e); return false;}
}

//Create jwt registry at db

async function addJwt(id, jwt, fecha_token, time_exp_s)
    {

        let collection = await ConectDataBase("APIRest", "jwt");
        try { 
            await collection.insertOne({"id_user": id,"jwt": jwt,"date_creation": fecha_token,"time_exp_s": time_exp_s});

            return true;
        }catch (e) {console.error(e); return false;}
                
    }

//Delete transaction for client

async function deletetransforclient(id)
{

        let collection = await ConectDataBase("APIRest", "Transactions");
        try {
            await collection.deleteOne({"id_sender": id});
            await collection.deleteOne({"id_reciver": id});
            CloseConectionDataBase();
            return true;  
            }
        catch(err)  {
            
            console.error(err);
            return false;
        
        }
    
}

async function retrieveuseremailtransactionbyid(id)
{
        try {
            let collection =  await ConectDataBase("APIRest", "Transactions"); 
            let ObjectId = MongoClient.ObjectId; 
            var variable;
            variable = await collection.findOne({ "_id": ObjectId(id) });
            let y = await RetriveUserById(variable.id_reciver);
            CloseConectionDataBase();
            return y.email;
        }
        catch( err )  {console.error(err)}

}

//Retrive transaction by id

async function RetrieveTransactionById(id)
{
        try {
            let collection =  await ConectDataBase("APIRest", "Transactions"); 
            let ObjectId = MongoClient.ObjectId; 
            var variable;
            variable = await collection.findOne({ "_id": ObjectId(id) });
            CloseConectionDataBase();
            return variable;
        }
        catch( err )  {console.error(err)}

}

//Validate/reject transaction

async function validate_transaction(transac)
{

        let collection = await ConectDataBase("APIRest", "Transactions");
        var ObjectId = MongoClient.ObjectId;
        userEmail = await rellenaobservable(transac._id);
        try {
            await collection.updateOne({"_id": ObjectId(transac._id) }, {$set:{"validated": transac.validated}});
            if(transac.validated == -1){
                //em.emit('sendEmail', userEmail, "rechazada.");
                //GetObservable(userEmail, "rechazada.");
                opcion = "rechazada.";
                observable.subscribe({
                    error: err => console.error('error: ' + err),
                    complete: () => console.log('Enviado!!!'),
                    });
            }else{
                //em.emit('sendEmail', userEmail, "validada.");
                opcion = "validada.";
                observable.subscribe({
                    error: err => console.error('error: ' + err),
                    complete: () => console.log('Enviado!!!'),
                    });
            }
            CloseConectionDataBase();
            return true;  
            }
        catch(err)  {
            
            console.error(err);
            return false;
        
        }
    
}

//Retrive all transactions by user id

async function retrievetransactionporusuaio(id)
{

        try {
            let collection =  await ConectDataBase("APIRest", "Transactions");
            let ObjectId = MongoClient.ObjectId; 
            var variable, v2;
            variable = await collection.find({"id_reciver": id}).toArray();
            v2 = await collection.find({"id_sender": id}).toArray();
            variable = variable.concat(v2);
            CloseConectionDataBase();
            return variable;
        }
        catch( err )  {console.error(err)}

}

em.on('sendEmail', sendMail);
/*observable.subscribe({
    next: x => em.on('sendEmail', sendMail)
});
const observable = new Observable(observer => {

    observer.next(em.emit('sendEmail', sendMail));

}); */


export {deletetransforclient, addJwt, addt, RetrieveTransactionById, validate_transaction, retrievetransactionporusuaio};