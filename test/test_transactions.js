const request = require('sync-request');
const path = require('path');
const scriptName = path.basename(__filename).replace('.js', '');

module.exports = async it => {

    const responseAuth1 = request('POST', 'http://localhost:4000/auth', {
        'json': {    
            "user": {
              "name": "jarko", 
              "password": "1234"
              }
          }
      });

    const token = JSON.parse(responseAuth1.getBody()).token;
    const id_1 = JSON.parse(responseAuth1.getBody()).respuesta._id;

    const responseAuth2 = request('POST', 'http://localhost:4000/auth', {
        'json': {    
            "user": {
              "name": "Victoria", 
              "password": "1234"
              }
          }
      });

    const token2 = JSON.parse(responseAuth2.getBody()).token;
    const id_2 = JSON.parse(responseAuth2.getBody()).respuesta._id;

    const responseNewTransaction = request ('POST', 'http://localhost:4000/transactions/new', {
        'headers': {
            'Access-token': token
        },
        'json': {    
            "transaction": {
                "id_sender": id_1,
                "id_reciver": id_2,
                "amount": "333",
                "validated": "0"
              }
          }


    });



    const id_t = JSON.parse(responseNewTransaction.getBody())._id_transaccion;
    console.log(id_t);
    it(scriptName, () => it.eq(responseNewTransaction.statusCode, 200));

    const responseValidateTransaction = request ('POST', 'http://localhost:4000/transactions/validate', {
        'headers': {
            'Access-token': token2
        },
        'json': { 
            'transaction':{
                "id_transaction": id_t
            },
            'token': token2
              }
          }
    );
    it(scriptName, () => it.eq(responseValidateTransaction.statusCode, 200));

    
    const responseRejectTransaction = request ('POST', 'http://localhost:4000/transactions/reject', {
        'headers': {
            'Access-token': token2
        },
        'json': { 
            'transaction':{
                "id_transaction": id_t
            },
            'token': token2
              }
          }
    );
    it(scriptName, () => it.eq(responseRejectTransaction.statusCode, 200));
}