var HashMap = require('hashmap');

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @return true si es correcto username y password, false e.o.c.
 */
function login(username, password){
    return getMapUsers().has(username) && (getMapUsers().search(password) == username);
}

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @return true si se completa correctamente (o ya existe -> login), false e.o.c.
 */
function newUser(username, password){
    if(getMapUsers().has(username)){//Ya existe
        return (getMapUsers().search(password) == username);     
    }
    else{
        let users = getMapUsers();
        users.set(username,password);
        return true;
    }

}

function getMapUsers(){
    let hash = new HashMap(); 
    hash.set('felix','felixpass');
    hash.set('cesar','cesarpass');
    return hash; // Para pruebas, debe recoger el hash map de todos los usuarios
}

/*
console.log(
    "\n\n login('felix','felixpass') -> " + login('felix','felixpass') + 
    "\n\n login('noexiste','felixpass') -> " + login('noexiste','felixpass') + 
    "\n\n newUser('pedro', 'pedropass') -> " + newUser('pedro', 'pedropass') + 
    "\n\n newUser('cesar', 'cesarpass') -> " + newUser('cesar', 'cesarpass')
)
*/