'use strict'

import {conect, close_conection} from '../../services/mongo_service/conection';
import MongoClient from 'mongodb';

//Create transaction

async function addt(transactions)
{

        let collection = await conect("APIRest", "Transactions");
        try {

            console.log("El usuario " + transactions.id_sender + " y el usuario_recividor " + transactions.id_reciver + " tienen una transaccion pendiente de " + transactions.amount); 
            let variable = await collection.insertOne({"id_sender": transactions.id_sender, "id_reciver": transactions.id_reciver, "amount": transactions.amount, "validated": 0});
            close_conection();
            return variable.insertedId;
            }catch (e) {console.error(e); return false;}
}

//Create jwt registry at db

async function addJwt(id, jwt, fecha_token, time_exp_s)
    {

        let collection = await conect("APIRest", "jwt");
        try { 
            await collection.insertOne({"id_user": id,"jwt": jwt,"date_creation": fecha_token,"time_exp_s": time_exp_s});

            return true;
        }catch (e) {console.error(e); return false;}
                
    }

//Delete transaction for client

async function deletetransforclient(id)
{

        let collection = await conect("APIRest", "Transactions");
        try {
            await collection.deleteOne({"id_sender": id});
            await collection.deleteOne({"id_reciver": id});
            mclient.close();
            return true;  
            }
        catch(err)  {
            
            console.error(err);
            return false;
        
        }
    
}

//Retrive transaction by id

async function retrievetransactionbyid(id)
{
        try {
            let collection =  await conect("APIRest", "Transactions"); 
            let ObjectId = MongoClient.ObjectId; 
            var variable;
            variable = await collection.findOne({ "_id": ObjectId(id) });
            close_conection();
            return variable;
        }
        catch( err )  {console.error(err)}

}

//Validate transaction

async function validate_transaction(transac)
{

        let collection = await conect("APIRest", "Transactions");
        var ObjectId = MongoClient.ObjectId;
        try {
            await collection.updateOne({"_id": ObjectId(transac._id) }, {$set:{"validated": transac.validated}});
            close_conection();
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
            let collection =  await conect("APIRest", "Transactions");
            let ObjectId = MongoClient.ObjectId; 
            var variable, v2;
            variable = await collection.find({"id_reciver": id}).toArray();
            v2 = await collection.find({"id_sender": id}).toArray();
            variable = variable.concat(v2);
            close_conection();
            return variable;
        }
        catch( err )  {console.error(err)}

}

export {deletetransforclient, addJwt, addt, retrievetransactionbyid, validate_transaction, retrievetransactionporusuaio};