const request = require('sync-request');
const path = require('path');
const scriptName = path.basename(__filename).replace('.js', '');

module.exports = async it => {

    const responseRegisterTrue = request('POST', 'http://localhost:4000/users/new', {
        
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

    it(scriptName, () => it.eq(responseRegisterTrue.statusCode, 200));
    
    //verificando add_user
    const responseRegisterDuplicateUser = request('POST', 'http://localhost:4000/users/new', {
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

    it(scriptName, () => it.eq(responseRegisterDuplicateUser.statusCode, 400));

    const responseRegisterValidatedatauser = request('POST', 'http://localhost:4000/users/new', {
        
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

    it(scriptName, () => it.eq(responseRegisterValidatedatauser.statusCode, 422));

    const responseAuth = request('POST', 'http://localhost:4000/auth', {
        'json': {    
            "user": {
              "name": "jarkonen", 
              "password": "1234"
              }
          }
      });

    const token = JSON.parse(responseAuth.getBody()).token;
    const id = JSON.parse(responseAuth.getBody()).respuesta._id;
    it(scriptName, () => it.eq(responseAuth.statusCode, 200));

    const responseAuthFailed = request('POST', 'http://localhost:4000/auth', {
        'json': {    
            "user": {
              "name": "jarko", 
              "password": "12345"
              }
          }
      });

      it(scriptName, () => it.eq(responseAuthFailed.statusCode, 400));

      //no actualiza en la bbdd mirar porque
    const responseUpdateUser = request('POST', 'http://localhost:4000/users/update', {
        'headers': {
            'Access-token': token
        },
        'json': {    
            'user': {

                "id": id,
                "name": "pimpampum",
                "email": "yosoybatman@gmail.com",
                "phone": "si",
                "cp": "cualquiera",
                "country": "gotham",
                "age": "indeterminada"

            }
          }
      });

    it(scriptName, () => it.eq(responseUpdateUser.statusCode, 200));

    const responseDeleteUser = request('POST', 'http://localhost:4000/users/delete', {
        'headers': {
            'Access-token': token
        },
        'json': {    
            'user': {

                "id": id

            }
          }
      });

    it(scriptName, () => it.eq(responseDeleteUser.statusCode, 200));
}