var express = require('express');
var HashMap = require('hashmap');
var nodemailer = require('nodemailer');

var app = express();
var lista_usuarios = new HashMap();

let array_vacio = [];
// Meto dos para hacer pruebas
lista_usuarios.set('felix', { username: 'felix', password: 'felixpass', mail: 'felix.arri@gmail.com', city: 'Navalcarnero', contact: '666666666', preferences: ['Celiaco'], link: '1234', validado: false, logueado: false });
lista_usuarios.set('cesar', { username: 'cesar', password: 'cesarpass', mail: 'cesar.herre@gmail.com', city: 'Madrid', contact: '622115544', preferences: array_vacio, link: '', validado: true, logueado: false });

function getUsuarios() {
    return lista_usuarios;
}

function existe_y_logueado(username) {
    return lista_usuarios.has(username) && lista_usuarios.get(username).logueado == true;
}
/**
 * 
 * @param {String} username
 * @param {String} password
 * @return true si es correcto username y password, false e.o.c.
 */
function login(username, password) {
    if (lista_usuarios.has(username) && (lista_usuarios.get(username).password == password)) {
        lista_usuarios.get(username).logueado = true;
        return "OK"
    }
    return "El usuario o la contraseña es incorrecta";
}
/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @return true si se completa correctamente (o ya existe -> login), false e.o.c.
 */
function signup(username, password, mail, city, contact, alergenos) {
    if (lista_usuarios.has(username)) { //Ya existe
        console.log("El nombre de usuario " + username + " ya existe en el sistema.")
        if (lista_usuarios.search(password) == username) {
            return "OK";
        }
        return "El nombre de usuario ya existe en el sistema, pero la contraseña no es correcta"
    } else {
        var user = { username: username, password: password, mail: mail, city: city, contact: contact, preferences: alergenos, logueado: true };
        lista_usuarios.set(username, user);
        enviarLink(username, mail);
        return "OK";
    }
}
/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {String} mail 
 * @param {String} city 
 * @param {String} contact 
 * @param {String[]} alergenos 
 */
function editProfile(username, password, mail, city, contact, alergenos) {
    var existe = lista_usuarios.has(username) && (lista_usuarios.get(username).password == password);
    var existe_y_logueado = existe && lista_usuarios.get(username).logueado == true;
    if (existe_y_logueado) {
        var perfil = lista_usuarios.get(username);
        perfil.username = username;
        perfil.password = password;
        perfil.mail = mail;
        perfil.city = city;
        perfil.contact = contact;
        perfil.preferences = alergenos;
        lista_usuarios.set(username, perfil);
        return "OK";
    }
    return "El usuario no existe o no está logueado";
}
/**
 * 
 * @param {String} username 
 * @param {String} mail 
 */
function enviarLink(username, mail) {
    var key = Math.random().toString(36).substring(7);
    var enlace_aleatorio = "http://localhost:3000/usuarios/validar/" + username + "/" + key;
    var mensaje = "Te has dado de alta en la plataforma de compra-venta de comidas caseras, con el nombre de usuario: " +
        username + "\n\nPara confirmar que eres tú, por favor, haga click en el siguiente enlace:\n\n" + enlace_aleatorio;
    console.log("Se envia un correo a " + mail);
    var usuario = lista_usuarios.get(username);
    usuario.link = key;
    lista_usuarios.set(username, usuario);
    sendEmail(mensaje, mail);
}
//Cuando el usuario hace click en el link
function validar(username, link) {
    console.log("entro en validar!!! USUARIO: " + username + ", LINK: " + link)
    var esLink = lista_usuarios.has(username) && lista_usuarios.get(username).link == link;
    if (esLink) {
        lista_usuarios.get(username).validado = true;
        return "Te has validado correctamente";
    }
    return "El link no coincide con el esperado";
}
/**
 * 
 * @param {String} mensaje 
 * @param {String} mail 
 */
function sendEmail(mensaje, mail) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'practicacomidasgrupo39@gmail.com',
            pass: 'grupo39pass'
        }
    });

    var mailOptions = {
        from: 'practicacomidasgrupo39@gmail.com',
        to: mail,
        subject: 'Enlace de validación de su cuenta en PracticaComidasGrupo39',
        text: mensaje
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
/**
 * 
 * @param {String} username 
 */
function logout(username) {
    if (lista_usuarios.has(username)) {
        lista_usuarios.get(username).logueado = false;
        return "OK";
    }
    return "El usuario no existe";
}
/**
 * 
 * @param {String} username 
 * @param {String} password 
 */
function darDeBaja(username, password) {
    if (lista_usuarios.has(username) && lista_usuarios.get(username).password == password && lista_usuarios.get(username).logueado == true) {
        lista_usuarios.remove(username);
        return "OK"
    }
    return "El usuario no existe o su contraseña no es correcta o no está logueado";
}


////////////////////// PRUEBAS Usuarios //////////////////////
/*
const util = require('util');

console.log(
    "\n\n login('felix','felixpass') -> " + login('felix','felixpass') + 
    "\n\n lista_usuarios -> " + util.inspect(lista_usuarios,{showHidden: false, depth: null}) + 
    "\n\n login('noexiste','felixpass') -> " + login('noexiste','felixpass') + 
    "\n\n signup('pedro', 'pedropass','pedro123@gmail.com','Madrid') -> " + signup('pedro', 'pedropass','pedro123@gmail.com','Madrid')  + 
    "\n\n signup('cesar', 'cesarpass','cesitar@gmail.com','Barcelona') -> " + signup('cesar', 'cesarpass','cesitar@gmail.com','Barcelona') +
    "\n\n lista_usuarios -> " + util.inspect(lista_usuarios,{showHidden: false, depth: null}) +
    "\n\n logout('felix','felixpass') -> " + logout('felix','felixpass') +
    "\n\n darDeBaja('pedro','pedropass') -> " + darDeBaja('pedro','pedropass') +
    "\n\n darDeBaja('felix','felixpass') -> " + darDeBaja('felix','felixpass') + 
    "\n\n lista_usuarios -> " + util.inspect(lista_usuarios,{showHidden: false, depth: null})
)
*/

// Rutas de gestor platos

app.get('/', function(req, res) {
    res.send('Bienvenido a la apliación de compra y venta de comidas desarrollada por el grupo 39 de Ingeniería del Software II!');
});
app.post('/signup', (req, res) => {
    var body = req.body;
    var error = signup(body.nombre, body.password,
        body.email, body.ciudad, body.contacto, body.alergenos)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la creacion de usuarios',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});

app.post('/editProfile', (req, res) => {
    var body = req.body;


    var error = editProfile(body.username, body.password, body.mail, body.city, body.contact, body.alergenos)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la edicion de usuarios',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});

app.post('/darDeBaja', (req, res) => {
    var body = req.body;


    var error = darDeBaja(body.username, body.password)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la eliminacion de usuarios',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});

app.post('/login', (req, res) => {
    var body = req.body;


    var error = login(body.username, body.password)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en login de usuarios',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});

app.post('/logout', (req, res) => {
    var body = req.body;


    var error = logout(body.username)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en logout de usuarios',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});
// acceder enlace validacion
app.get('/validar/:id/:key', (req, res) => {
    res.send(validar(req.params.id, req.params.key))

});
module.exports = app;
module.exports.getUsuarios = getUsuarios;
module.exports.existe_y_logueado = existe_y_logueado;