const bcrypt = require('bcrypt');
//import {bcrypt} from '../node_modules/bcrypt';

// encriptamos
function encriptar(string) {

    const plaintext = string;
    const salt = 10;
    const hash = bcrypt.hashSync(plaintext, salt);

    return hash;

}

function comprueba(string, hash) {

    if(bcrypt.compareSync(string, hash)===true){
        return true;
    }else{
        return false;
    }
    
}

export {encriptar};
export {comprueba};