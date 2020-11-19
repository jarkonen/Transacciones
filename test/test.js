const request = require('sync-request');
const path = require('path');
const scriptName = path.basename(__filename).replace('.js', '');

module.exports = async it => {
    
    //No duplicate users
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
}

/*var chai = require('chai');
let chaiHttp = require('chai-http');
var assert = chai.assert;
var should = chai.should();
var expect = require('chai').expect;
const request = require('sync-request');
chai.use(chaiHttp);
const url= 'http://localhost:4000/users/new';
/*var calculator = require('../src/calculator');

describe('Test assert function: ', function(){
    describe('Check addtest function', function(){
        it('Check the returned value using : assert.equial(v1, v2): ', function(){
            result = calculator.addTest(1,1);
            assert.equal(result,2);
        });
    });
});*/
/*module.exports = async it => {

        const responseRegisterDuplicateUser = chai.request('POSsaddasT', url, {
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

        it('Correo dupli', ()=> it.eq(responseRegisterDuplicateUser.statusCode, 400));
}
/*describe('Correo duplicado: ',()=>{
    it('correo dupkli', (done) => {
    chai.request(url)
    .post('/users/new')
    .send({    
        name: "jarko",
        contraseña: "1234",
        email: "yosoyjarko@gmail.com",
        phone: "si",
        cp: "cualquiera",
        country: "gotham",
        age: "indeterminada"
  })
    .end( function(err,res){
    console.log(res)
    expect(res).to.have.status(400);
    done();
    });
    });
   });*/

/*describe('prueba', function(){
    const responseRegisterDuplicateUser = request('POST', 'http://localhost:4000/users/new', {
        'json': {    
                "name": "jarko",
                "contraseña": "1234",
                "email": "yosoyjarko@gmail.com",
                "phone": "si",
                "cp": "cualquiera",
                "country": "gotham",
                "age": "indeterminada"
          }
      });

      it('Correo duplicado', () => it.eq(responseRegisterDuplicateUser.statusCode, 400));
});*/