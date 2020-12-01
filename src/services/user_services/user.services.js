'use strict'

import {ConectDataBase, CloseConectionDataBase} from '../../services/mongo_service/conection';
import MongoClient from 'mongodb';

var events = require('events');
var em = new events.EventEmitter();

//Create user

async function add(Users)
{

    let collection = await ConectDataBase("APIRest", "Users");
        try {
            console.log("El usuario " + Users.name + " con correo " + Users.email + " a sido correctamente agregado"); 
            await collection.insertOne({"name": Users.name,"contraseña": Users.contraseña, "email": Users.email, "phone": Users.phone, "cp": Users.cp, "country": Users.country, "age": Users.age, "admin": Users.admin, "transactions": Users.transactions});
            Users = await collection.findOne({ "email": Users.email});
            CloseConectionDataBase();
            return Users._id;
        }catch (e) {console.error(e); return false;}
            
}

function sendMail(email, message){

    console.log("El correo " + email + " a cambiado el estado de la transaccion a " + message);

}

//Update user

async function commit(Users)
{

        let collection = await ConectDataBase("APIRest", "Users");
        var ObjectId = MongoClient.ObjectId;
        try {
            await collection.updateOne({"_id": ObjectId(Users.id) }, {$set:{"name": Users.name, "email": Users.email, "phone": Users.phone, "cp": Users.cp, "country": Users.country, "age": Users.age}});
            CloseConectionDataBase();
            return true;  
            }
        catch(err)  {
            
            console.error(err);
            return false;
        
        }
    
}

//Delete user

async function wipe_out(id)
{

        let collection = await ConectDataBase("APIRest", "Users");
        var ObjectId = MongoClient.ObjectId;
        try {
            await collection.deleteOne({"_id": ObjectId(id)});
            CloseConectionDataBase();
            return true;  
            }
        catch(err)  {
            
            console.error(err);
            return false;
        
        }
    
}

//Get user for id

async function RetriveUserById(id)
{

        try {

            let collection = await ConectDataBase("APIRest", "Users"); 
            let ObjectId = MongoClient.ObjectId; 
            var variable = await collection.findOne({ "_id": ObjectId(id) });
            CloseConectionDataBase();
            return variable;

        }
        catch( err )  {console.error(err)}

}

//Check if email is in use

async function check_mail(usuario)
{

        try {

            let collection =  await ConectDataBase("APIRest", "Users");
            var variable;
            variable = await collection.findOne({ "email": usuario.email});
            CloseConectionDataBase();
            if(variable != null){
                return true;
            }else{
                return false;
            }

        }
        catch( err )  {console.error(err); return false;}

}

//Retrieve user for name

async function retrieve(usuario)
{

    let collection = await ConectDataBase("APIRest", "Users");
        try {
            var variable;
            variable = await collection.findOne({ "name": usuario.name });
            CloseConectionDataBase();

            return variable;
        }
        catch( err )  {console.error(err)}

}

//Retrive id_user by token

async function RetriveUserIdByToken(token)
{

        try {
            let collection =  await ConectDataBase("APIRest", "jwt"); 
            //let ObjectId = MongoClient.ObjectId; 
            var variable;
            variable = await collection.findOne({ "jwt": token });
            CloseConectionDataBase();
            return variable.id_user;
        }
        catch( err )  {console.error(err)}

}



export {add, commit, wipe_out, RetriveUserById, check_mail, retrieve, RetriveUserIdByToken, sendMail};