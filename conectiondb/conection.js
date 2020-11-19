'use strict'
import MongoClient from 'mongodb';
import {Users} from '../src/modelos/users';
import {Transactions} from '../src/modelos/transactions';
import {conect, close_conection} from '../src/services/mongo_service/conection';

/*const uri = "mongodb+srv://Jarkonen:mongoseña7@cluster0.anskl.mongodb.net/APIRest?retryWrites=true&w=majority";
let mclient;*/

/*async function conecta(database, collection_Insert) {

        mclient = await MongoClient.connect(uri,
        { useNewUrlParser: true,
        });
        console.log("About to select db");
        let db = mclient.db(database);
        let collection = db.collection(collection_Insert);
        return collection;
        
}*/

class Conectaamongo{


    //INSERT
    /*async add(Users)
    {

        let collection = await conect("APIRest", "Users");
            try {
                console.log("El usuario " + Users.name + " con correo " + Users.email + " a sido correctamente agregado esto se imprime desde add"); 
                await collection.insertOne({"name": Users.name,"contraseña": Users.contraseña, "email": Users.email, "phone": Users.phone, "cp": Users.cp, "country": Users.country, "age": Users.age, "admin": Users.admin, "transactions": Users.transactions});
                Users = await collection.findOne({ "email": Users.email});
                close_conection();
                return Users._id;
            }catch (e) {console.error(e); return false;}
                
    }*/

    /*async addJwt(id, jwt, fecha_token, time_exp_s)
    {

        let collection = await conect("APIRest", "jwt");
        try { 
            await collection.insertOne({"id_user": id,"jwt": jwt,"date_creation": fecha_token,"time_exp_s": time_exp_s});
            close_conection();
            return true;
        }catch (e) {console.error(e); return false;}
                
    }*/

    /*async addt(transactions)
    {
 
            let collection = await conect("APIRest", "Transactions");
            try {

                console.log("El usuario " + transactions.id_sender + " y el usuario_recividor " + transactions.id_reciver + " tienen una transaccion pendiente de " + transactions.amount); 
                let variable = await collection.insertOne({"id_sender": transactions.id_sender, "id_reciver": transactions.id_reciver, "amount": transactions.amount, "validated": 0});
                mclient.close();
                return variable.insertedId;
                }catch (e) {console.error(e); return false;}
    }*/

    //GET

    /*async comprueba(usuario)
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

    }*/

    /*async retrieve(usuario)
    {

        let collection = await conect("APIRest", "Users");
            try {
                var variable;
                variable = await collection.findOne({ "name": usuario.name });
                close_conection();

                console.log(variable);
                if(variable === null){
                    return variable;
                }else{
                    this.name = variable.name;
                    this.address = variable.address;
                    this.id = variable._id;
                    return variable;
                }
            }
            catch( err )  {console.error(err)}

    }*/

    /*async retrieveadmin(id)
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

    }*/

    /*async retrieve_id_user_token(token)
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

    }*/

    /*async retrievetransaction(id)
    {

            let mclient = await MongoClient.connect(uri,
                { useNewUrlParser: true });
    
            try {
                console.log("accesing database");
                let db = mclient.db('APIRest');
                let collection =  db.collection('Transactions');  
                let ObjectId = MongoClient.ObjectId; 
                var variable;
                variable = await collection.findOne({ "_id": ObjectId(id) });
                mclient.close();
                return variable;
            }
            catch( err )  {console.error(err)}

    }*/

    /*async retrievetransactionporusuaio(id)
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

    }*/

        //UPDATE

        //usuarios
        /*async commit(Users)
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
            
        }*/
//desde aki
      /*  async commit_validation(id)
        {

                let collection = await conect("APIRest", "Users");
                var ObjectId = MongoClient.ObjectId;
                try {
                    await collection.updateOne({"_id": ObjectId(id) }, {$set:{"active": true}});
                    close_conection();
                    return true;  
                    }
                catch(err)  {
                    
                    console.error(err);
                    return false;
                
                }
            
        }

        //transacciones
        async commit_transaction(transac)
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
*/
//hasta aki
        //DELETE

        /*async delete(id)
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
            
        }*/

    /*    async deletetrans(id)
        {

                let collection = await conect("APIRest", "Transactions");
                //var ObjectId = MongoClient.ObjectId;
                try {
                    await collection.deleteOne({"_id": id});
                    close_conection();
                    return true;  
                    }
                catch(err)  {
                    
                    console.error(err);
                    return false;
                
                }
            
        }*/

        /*async deletetransporcliente(id)
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
            
        }*/

}

export {Conectaamongo};