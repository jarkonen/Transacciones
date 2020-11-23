const request = require('sync-request');
const path = require('path');
const scriptName = path.basename(__filename).replace('.js', '');

module.exports = async it => {
    
    //verificando add_user
    console.log("hola");
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
    console.log("hola");
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
              "name": "jarko", 
              "password": "1234"
              }
          }
      });

    const token = JSON.parse(responseAuth.getBody()).token;

    const responseUpdateUser = request('POST', 'http://localhost:4000/users/update', {
        'headers': {
            'token': token
        },
        'json': {    
            'user': {

                "id": "5fa549620a943f11c470dd3d",
                "name": "nanananabatman",
                "email": "yosoybatman@gmail.com",
                "phone": "si",
                "cp": "cualquiera",
                "country": "gotham",
                "age": "indeterminada"

            }
          }
      });

    it(scriptName, () => it.eq(responseUpdateUser.statusCode, 200));
}