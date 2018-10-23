var HashMap = require('hashmap');
const util = require('util');

var lista_usuarios = new HashMap();

// Meto dos para hacer pruebas
lista_usuarios.set('felix',{username:'felix', password:'felixpass', mail:'felix.arri@gmail.com', city:'Navalcarnero'});
lista_usuarios.set('cesar',{username:'cesar', password:'cesarpass', mail:'cesar.herre@gmail.com', city:'Madrid'});

/**
 * 
 * @param {String} username
 * @param {String} password
 * @return true si es correcto username y password, false e.o.c.
 */
function login(username, password){
    return lista_usuarios.has(username) && (lista_usuarios.get(username).password == password);
}

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @return true si se completa correctamente (o ya existe -> login), false e.o.c.
 */
function signup(username, password, mail, city){
    if(lista_usuarios.has(username)){//Ya existe
        console.log("El nombre de usuario " + username + " ya existe en el sistema.")
        return (lista_usuarios.search(password) == username);
    }
    else{
        var user =  {username:username, password:password, mail:mail, city:city};
        lista_usuarios.set(username,user);
        enviarLink(username,mail);
        return true;
    }
}

function enviarLink(username, mail){
    var mensaje = "Te has dado de alta en la plataforma de compra-venta de comidas caseras, con el nombre de usuario: " 
    + username + "\n\nPara confirmar que eres tú, por favor, haga click en el siguiente enlace:\n\n";
    console.log("Se envia un correo a " + mail);
}

/*
console.log(
    "\n\n login('felix','felixpass') -> " + login('felix','felixpass') + 
    "\n\n lista_usuarios -> " + util.inspect(lista_usuarios) + 
    "\n\n login('noexiste','felixpass') -> " + login('noexiste','felixpass') + 
    "\n\n signup('pedro', 'pedropass','pedro123@gmail.com','Madrid') -> " + signup('pedro', 'pedropass','pedro123@gmail.com','Madrid')  + 
    "\n\n signup('cesar', 'cesarpass','cesitar@gmail.com','Barcelona') -> " + signup('cesar', 'cesarpass','cesitar@gmail.com','Barcelona') +
    "\n\n lista_usuarios -> " + util.inspect(lista_usuarios)
)
*/