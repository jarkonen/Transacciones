'use strict'

class Transactions{

    constructor(id_sender, id_reciver, amount, validated){

        this.id_sender = id_sender;
        this.id_reciver = id_reciver;
        this.amount = amount;
        this.validated = validated;

    }

}

export{Transactions};