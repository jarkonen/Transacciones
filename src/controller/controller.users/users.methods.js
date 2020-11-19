'use strict'
import {app} from '../../app';
import {Users} from '../../modelos/users';
import {comprueba, encriptar} from '../../services/security_services/security/cbrypt';
import {all_Transactions_Validated} from '../controller.transactions/transactions.methods';
const {check, validationResult} = require('express-validator');
import {add, commit, wipe_out, retrieveadmin, check_mail, retrieve} from '../../services/user_services/user.services';
import {deletetransforclient, addJwt} from '../../services/transaction_services/transactions.services';

const jwt = require('jsonwebtoken');

const registerValidator = [

    check('name').exists(),
    check('contraseña', 'contraseña es necesaria').exists(),
    check('age').exists(),
    check('email').isEmail(),
    check('cp').exists(),
    check('phone').exists(),
    check('country').exists(),

];

const updateValidator = [

    check('name').exists(),
    check('id').exists(),
    check('age').exists(),
    check('email').isEmail(),
    check('cp').exists(),
    check('phone').exists(),
    check('country').exists(),

];

const authValidator = [

    check('name').exists(),
    check('contraseña').exists(),

];

const deleteValidator = [

    check('id').exists(),

];

//Borra un usuario

async function delete_User(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }else{

        let usu = await retrieveadmin(req.body.id);
        console.log(await all_Transactions_Validated(req.body.id));
        if(all_Transactions_Validated(req.body.id) !== false){
    
            if(usu.admin===true){
    
                let respuesta = await wipe_out(usu.id);
                await deletetransforclient(usu.id);
                return res.status(400).send(JSON.stringify({message: "El usuario a sido eliminado", respuesta}));
    
            }else{
    
                let respuesta = await wipe_out(req.body.id);
                //error que tengo que corregir UnhandledPromiseRejectionWarning: TypeError: (0 , _transactions2.deletetransforclient) is not a function
                await deletetransforclient(req.body.id);
                return res.status(400).send(JSON.stringify({message: "El usuario a sido eliminado", respuesta}));
    
            }
        
    
        }else{
            return JSON.stringify({message: "Tienes transacciones pendientes de validacion"});
        }

    }
    
}

//Actualiza los datos de un usuario

async function update_user(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }else{

        let datos = req.body;
        let usuario = create_Object_User(datos);
    
        try {
            let usu2 = await retrieveadmin(usuario.id);
            console.log(usu2);
            if(usu2.admin===true){
    
                let respuesta = await commit(usuario);
                return res.status(400).send(JSON.stringify({message:"Actualizado correctamente",respuesta}));
    
            }else{
    
                let respuesta = await commit(usuario);
                return res.status(400).send(JSON.stringify({message:"Actualizado correctamente",respuesta}));
    
            }
        } catch (err) {
            console.error(err);
        }
    

    }
    
}


//Agrega un nuevo usuario y devuelve JSON

async function add_User(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }else{

        let datos = req.body;
        let usuario = create_Object_User(datos);
        console.log(usuario);
        /*if(datos.token == "undefined"){*/
    
            if(usuario !== false){
    
                usuario.contraseña = encriptar(usuario.contraseña);
    
                if(await check_mail(usuario) === true){
    
                    return res.status(400).send(JSON.stringify({message: "El correo ya esta en uso"}));
    
                }else{
    
                    let respuesta = await add(usuario);
                    return res.status(400).send(JSON.stringify({message:"El usuario a sido registrado correctamente ", respuesta}));
    
                }
    
            }else{
    
                return res.status(400).JSON({message: "Por favor rellena todos los datos obligatorios"});
    
            }

    }


    /*}else{

        return JSON.stringify({message: "Para crear un usuario no debes estar iniciado"});

    }*/

}

//Crea objeto usuario

function create_Object_User(datos){

    let usuario = new Users();

        usuario.setid(datos.id);
        usuario.setname(datos.name);
        usuario.setcontraseña(datos.contraseña);
        usuario.setage(datos.age);
        usuario.setcountry(datos.country);
        usuario.setcp(datos.cp);
        usuario.setphone(datos.phone);
        usuario.setemail(datos.email);
        return usuario;

}

//Comprueba el usuario y devuelve JSON

async function check_User(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }else{

        let usuario = new Users();
    
        usuario.setname(req.query.name);
        usuario.setcontraseña(req.query.password);
        let respuesta = await retrieve(usuario);
    
        if(respuesta !== null){
    
            let token = await check_Password(usuario, respuesta);
            if(token !== false){
    
                return res.status(400).send(JSON.stringify({message: "Datos correctos", respuesta, token}));
    
            }else{
    
                return res.status(400).send(JSON.stringify({message: "Datos incorrectos porfavor compruebe su usuario y contraseña"}));
    
            }
    
        }else{
    
            return res.status(400).send(JSON.stringify({message: "Datos incorrectos porfavor compruebe su usuario y contraseña"}));
    
        }

    }
    
}

//Comprueba que el correo del usuario sea correcto

async function check_Password(usuario, respuesta) {
    if(comprueba(usuario.contraseña, respuesta.contraseña) === true){

        let token = await Token(respuesta);
        return token;

    }else{

        return false;

    }

}

//Recibe usuario , devuelve un token y crea registro en db

async function Token(respuesta) {

    const payload = {

        check:  true,
        name: respuesta.name,
        id: respuesta._id

       };

    const token = jwt.sign(payload, app.get('llave'), {

        expiresIn: 1440

        });

        let hour = return_Formated_Data();
        await addJwt(respuesta._id, token, hour, 1440);
        return token;

}

function return_Formated_Data() {

    let hora = new Date();
    let h1 = hora.getFullYear() + "-" + hora.getMonth() + "-" + hora.getDate() + " " + hora.getHours() + ":" + hora.getMinutes() + ":" + hora.getSeconds();
    return h1;

}

export {check_User, add_User, update_user, delete_User, registerValidator, updateValidator, deleteValidator};