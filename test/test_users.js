const request = require('sync-request');
const path = require('path');
const scriptName = path.basename(__filename).replace('.js', '');

module.exports = async it => {

    const responseRegisterSuccessfully = request('POST', 'http://localhost:5000/users/new', {
        
        'json': {    
            'user': {
                "name": "jarkonen",
                "contraseña": "1234",
                "email": "yosoyjarkonen@gmail.com",
                "phone": "si",
                "cp": "cualquiera",
                "country": "gotham",
                "age": "indeterminada"

            }
          }
      });

    it(scriptName + " responseRegisterSuccessfully", () => it.eq(responseRegisterSuccessfully.statusCode, 200));
    
    //verificando add_user
    const responseRegisterDuplicateUser = request('POST', 'http://localhost:5000/users/new', {
        'json': {    
            'user': {

                "name": "jarko",
                "contraseña": "1234",
                "email": "yosoyjarko@gmail.com",
                "phone": "si",
                "cp": "cualquiera",
                "country": "gotham",
                "age": "indeterminada"

            }
          }
      });

    it(scriptName + " responseRegisterDuplicateUser", () => it.eq(responseRegisterDuplicateUser.statusCode, 400));

    const responserRegisterWithIncompleteData = request('POST', 'http://localhost:5000/users/new', {
        
        'json': {    
            'user': {

                "contraseña": "1234",
                "email": "yosoyjarko@gmail.com",
                "phone": "si",
                "cp": "cualquiera",
                "country": "gotham",
                "age": "indeterminada"

            }
          }
      });

    it(scriptName + " responserRegisterWithIncompleteData", () => it.eq(responserRegisterWithIncompleteData.statusCode, 422));

    const responseAuthSuccessfully = request('POST', 'http://localhost:5000/auth', {
        'json': {    
            "user": {
              "name": "jarkonen", 
              "password": "1234"
              }
          }
      });

    const token = JSON.parse(responseAuthSuccessfully.getBody()).token;
    const id = JSON.parse(responseAuthSuccessfully.getBody()).respuesta._id;
    it(scriptName + " responseAuthSuccessfully", () => it.eq(responseAuthSuccessfully.statusCode, 200));

    const responseAuthFailed = request('POST', 'http://localhost:5000/auth', {
        'json': {    
            "user": {
              "name": "jarko", 
              "password": "12345"
              }
          }
      });

      it(scriptName + " responseAuthFailed", () => it.eq(responseAuthFailed.statusCode, 400));

    const responseUpdateUserSuccessfully = request('POST', 'http://localhost:5000/users/update', {
        'headers': {
            'Access-token': token
        },
        'json': {    
            'user': {

                "id": id,
                "name": "lololo",
                "email": "yosoybatman@gmail.com",
                "phone": "si",
                "cp": "cualquiera",
                "country": "gotham",
                "age": "indeterminada"

            }
          }
      });

    it(scriptName + " responseUpdateUserSuccessfully", () => it.eq(responseUpdateUserSuccessfully.statusCode, 200));

    const responseUpdateValidateDataUser = request('POST', 'http://localhost:5000/users/update', {
        'headers': {
            'Access-token': token
        },
        'json': {    
            'user': {

                "name": "pimpampum",
                "email": "yosoybatman@gmail.com",
                "phone": "si",
                "cp": "cualquiera",
                "country": "gotham",
                "age": "indeterminada"

            }
          }
      });

    it(scriptName + " responseUpdateValidateDataUser", () => it.eq(responseUpdateValidateDataUser.statusCode, 422));

    const responseDeleteUserSuccessfully = request('POST', 'http://localhost:5000/users/delete', {
        'headers': {
            'Access-token': token
        },
        'json': {    
            'user': {

                "id": id

            }
          }
      });

    it(scriptName + " responseDeleteUserSuccessfully", () => it.eq(responseDeleteUserSuccessfully.statusCode, 200));

    const responseDeleteValidateDataUser = request('POST', 'http://localhost:5000/users/delete', {
        'headers': {
            'Access-token': token
        },
        'json': {    
            'user': {


            }
          }
      });

    it(scriptName + " responseDeleteValidateDataUser", () => it.eq(responseDeleteValidateDataUser.statusCode, 422));
}