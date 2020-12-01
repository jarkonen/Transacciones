'use strict'

import {MongoClient} from 'mongodb';
require ('dotenv').config();

const uri = "mongodb+srv://Jarkonen:"+process.env.MONGO+"@cluster0.anskl.mongodb.net/APIRest?retryWrites=true&w=majority";
let mclient;

async function ConectDataBase(database, collection_Insert) {

        mclient = await MongoClient.connect(uri,
        { useNewUrlParser: true,
        });
        console.log("Conect to db " + database + " collection " + collection_Insert);
        let db = mclient.db(database);
        let collection = db.collection(collection_Insert);
        return collection;
        
}

async function CloseConectionDataBase() {
    console.log("Closing conection to db");
    mclient.close();
}

export{ConectDataBase, CloseConectionDataBase};