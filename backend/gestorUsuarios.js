var express = require('express');
var HashMap = require('hashmap');
var nodemailer = require('nodemailer');
var getUsuPlatos = require('./gestorPlatos.js');
var calcularPuntos = require('./gestorPlatos.js');
var addUsuario_platos_comprados_por_usuario = require('./gestorPlatos.js');

var app = express();
var lista_usuarios = new HashMap();

let array_vacio = [];
// Meto dos para hacer pruebas
lista_usuarios.set('Felix', { username: 'Felix', password: 'felixpass', mail: 'felix.arri@gmail.com', city: 'Madrid', contact: '666666666', alergenos: ['lactosa'], link: '1234', validado: true, logueado: false, preferences: [] });
lista_usuarios.set('Cesar', { username: 'Cesar', password: 'cesarpass', mail: 'cesar.herre@gmail.com', city: 'Soria', contacto: '622115544', alergenos: ['lactosa'], link: '1236', validado: true, logueado: false, preferences: [] });
lista_usuarios.set('Adrian', { username: 'Adrian', password: 'adrianpass', mail: 'adrian.caro@gmail.com', city: 'Madrid', contacto: '629115544', alergenos: ['gluten'], link: '1237', validado: true, logueado: false, preferences: [] });
lista_usuarios.set('Jorge', { username: 'Jorge', password: 'jorgepass', mail: 'jorge.anto@gmail.com', city: 'Boadilla', contacto: '629117544', alergenos: ['gluten', 'lactosa'], link: '1235', validado: true, logueado: false, preferences: [] });
lista_usuarios.set('Borja', { username: 'Borja', password: 'borjapass', mail: 'borja.mar@gmail.com', city: 'Barcelona', contacto: '609117544', alergenos: array_vacio, link: '1231', validado: true, logueado: false, preferences: [] });

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
        console.log("El usuario " + username + " ha hecho login correctamente")
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
            addUsuario_platos_comprados_por_usuario.addUsuario_platos_comprados_por_usuario(username, []);
        console.log("El usuario " + username + " se ha registrado correctamente")
        return "OK";
        }
        return "El nombre de usuario ya existe en el sistema, pero la contraseña no es correcta"
    } else {
        var user = { username: username, password: password, mail: mail, city: city, contact: contact, alergenos: alergenos, logueado: true, preferences: [] };
        lista_usuarios.set(username, user);
        enviarLink(username, mail);
        console.log("El usuario " + username + " se ha registrado correctamente")
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
function editProfile(user, username, password, mail, city, contact, alergenos) {
    var perfil = lista_usuarios.get(user);
    perfil.nombre = username == "" ? perfil.nombre : username;
    perfil.password = password == "" ? perfil.password : password;
    perfil.email = mail == "" ? perfil.email : mail;
    perfil.ciudad = city == "" ? perfil.ciudad : city;
    perfil.contact = contact == "" ? perfil.contact : contact;
    perfil.alergenos = alergenos == "" ? perfil.alergenos : alergenos;
    perfil.preferences = perfil.preferences;
    lista_usuarios.set(username, perfil);
    console.log("El usuario " + username + " ha cambiado su perfil correctamente")
    return "OK";
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
        console.log("El usuario " + username + " ha cerrado sesion correctamente")
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

/**
 * 
 * @param {String} user 
 * 
 */
function getAlergenos(user) {
    return getUsuarios().get(user).alergenos;
}
/**
 * 
 * @param {String} user 
 * 
 */
function getLocalizacion(user) {
    return getUsuarios().get(user).city;
}

function verRanking() {
    usu_platos = getUsuPlatos.getUsuPlatos;
    usuario_puntos = new HashMap();
    usuarios = usu_platos.keys();
    for (var i = 0; i < usuarios.length; i++) {
        var platos = usu_platos.get(usuarios[i]);
        usuario_puntos.set(usuarios[i], calcularPuntos.calcularPuntos(platos));
    }
    //ORDENAR DE MAYOR A MENOR PUNTOS -> ORDENAR DE MAYOR A MENOR VALUES
    return usuario_puntos;
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
// Rutas de gestor usuarios
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
app.post('/editProfile/:id', (req, res) => {
    var body = req.body;
    var error = editProfile(req.params.id, body.nombre, body.password,
        body.email, body.ciudad, body.contacto, body.alergenos)
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
app.get('/validar/:id/:key', (req, res) => { // acceder enlace validacion
    res.send(validar(req.params.id, req.params.key))

});
app.get('/:usuario/preferencias', (req, res) => {
    var body = req.body;
    var error = delimitarPreferencias(req.params.usuario, body.alergenos);
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la delimitación de preferencias',
            errors: error
        });
    }
    res.status(200).json({
        ok: true,
        body: error
    });

});
module.exports = app;
module.exports.getUsuarios = getUsuarios;
module.exports.getLocalizacion = getLocalizacion;
module.exports.getAlergenos = getAlergenos;
module.exports.existe_y_logueado = existe_y_logueado;