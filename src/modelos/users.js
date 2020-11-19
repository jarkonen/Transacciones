'use strict'

class Users{

    constructor(id, name, contraseña, email, phone, cp, country, age, admin){

        this.id = id;
        this.name = name;
        this.contraseña = contraseña;
        this.email = email;
        this.phone = phone;
        this.cp = cp;
        this.country = country;
        this.age = age;
        this.admin = false;
        this.active = false;

    }

    getid(){
        return this.id;
    }
    setid(id){
        this.id = id;
    }
    getname(){
        return "Mr " + this.name;
    }
    setname(name){
        this.name = name;
    }
    getcontraseña(){
        return this.contraseña;
    }
    setcontraseña(contraseña){
        this.contraseña = contraseña;
    }
    getemail(){
        return this.email;
    }
    setemail(email){
        this.email = email;
    }
    getphone(){
        return this.phone;
    }
    setphone(phone){
        this.phone = phone;
    }
    getcp(){
        return this.cp;
    }
    setcp(cp){
        this.cp = cp;
    }
    getcountry(){
        return this.country;
    }
    setcountry(country){
        this.country = country;
    }
    getage(){
        return this.age;
    }
    setage(age){
        this.age = age;
    }
    getactive(){
        return this.active;
    }
    setactive(active){
        this.active = active;
    }
   
}

export{Users};