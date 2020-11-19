'use strict'

import {conect, close_conection} from '../../services/mongo_service/conection';
import MongoClient from 'mongodb';

//Create user

async function add(Users)
{

    let collection = await conect("APIRest", "Users");
        try {
            console.log("El usuario " + Users.name + " con correo " + Users.email + " a sido correctamente agregado"); 
            await collection.insertOne({"name": Users.name,"contraseña": Users.contraseña, "email": Users.email, "phone": Users.phone, "cp": Users.cp, "country": Users.country, "age": Users.age, "admin": Users.admin, "transactions": Users.transactions});
            Users = await collection.findOne({ "email": Users.email});
            close_conection();
            return Users._id;
        }catch (e) {console.error(e); return false;}
            
}

//Update user

async function commit(Users)
{

        let collection = await conect("APIRest", "Users");
        var ObjectId = MongoClient.ObjectId;
        try {
            await collection.updateOne({"_id": ObjectId(Users.id) }, {$set:{"name": Users.name, "email": Users.email, "phone": Users.phone, "cp": Users.cp, "country": Users.country, "age": Users.age}});
            close_conection();
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

        let collection = await conect("APIRest", "Users");
        var ObjectId = MongoClient.ObjectId;
        try {
            await collection.deleteOne({"_id": ObjectId(id)});
            close_conection();
            return true;  
            }
        catch(err)  {
            
            console.error(err);
            return false;
        
        }
    
}

//Get user for id

async function retrieveadmin(id)
{

        try {

            let collection = await conect("APIRest", "Users"); 
            let ObjectId = MongoClient.ObjectId; 
            var variable;
            variable = await collection.findOne({ "_id": ObjectId(id) });
            close_conection();
            return variable;

        }
        catch( err )  {console.error(err)}

}

//Check if email is in use

async function check_mail(usuario)
{

        try {

            let collection =  await conect("APIRest", "Users");
            var variable;
            variable = await collection.findOne({ "email": usuario.email});
            close_conection();
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

    let collection = await conect("APIRest", "Users");
        try {
            var variable;
            variable = await collection.findOne({ "name": usuario.name });
            close_conection();

            return variable;
        }
        catch( err )  {console.error(err)}

}

//Retrive id_user by token

async function retrieve_id_user_token(token)
{

        try {
            let collection =  await conect("APIRest", "jwt"); 
            //let ObjectId = MongoClient.ObjectId; 
            var variable;
            variable = await collection.findOne({ "jwt": token });
            close_conection();
            return variable.id_user;
        }
        catch( err )  {console.error(err)}

}

export {add, commit, wipe_out, retrieveadmin, check_mail, retrieve, retrieve_id_user_token};