'use strict'

import {MongoClient} from 'mongodb';

const uri = "mongodb+srv://Jarkonen:mongoseña7@cluster0.anskl.mongodb.net/APIRest?retryWrites=true&w=majority";
let mclient;

async function conect(database, collection_Insert) {

        mclient = await MongoClient.connect(uri,
        { useNewUrlParser: true,
        });
        console.log("Conect to db " + database + " collection " + collection_Insert);
        let db = mclient.db(database);
        let collection = db.collection(collection_Insert);
        return collection;
        
}

async function close_conection() {
    console.log("Closing conection to db");
    mclient.close();
}

async function return_objectid() {
    
    var ObjectId = MongoClient.ObjectId;
    return ObjectId;

}

export{conect, close_conection,return_objectid};