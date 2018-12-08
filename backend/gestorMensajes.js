var express = require('express');
var HashMap = require('hashmap');
var getPlatos = require('./gestorPlatos.js');

var app = express();
// Hashmap de usuarios, dentro de cada usuario: Hashmap de mensajes, con key: idMensaje y value: mensaje.
var lista_idMensajes = new HashMap();//lista de los ids de mensajes activos de cada usuario (k:idMensaje, v:array de los mensajes)
var lista_mensajes = new HashMap();//lista de los mensajes activos de cada usuario
// Ejemplos para pruebas:
lista_idMensajes.set("Felix_Cesar_macarrones", {oferta: "macarrones", msgs:[{fecha: "1544195950732", emisor: "Felix", texto: "Hola!"}], vendedor: "Cesar", comprador: "Felix"}); // ID: emisor+receptor+oferta
lista_idMensajes.set("Felix_Cesar_Champiñones", {oferta: "Champiñones", msgs:[{fecha: "1544195950732", emisor: "Felix", texto: "Ey!"}], vendedor: "Cesar", comprador: "Felix"}); // ID: emisor+receptor+oferta

lista_mensajes.set("Felix", ['Felix_Cesar_macarrones', 'Felix_Cesar_Champiñones']);
lista_mensajes.set("Cesar", ['Felix_Cesar_macarrones', 'Felix_Cesar_Champiñones']);

function verListaMensajes(usuario){
    return lista_mensajes.get(usuario) == undefined ? [] : lista_mensajes.get(usuario);
}

function verMensajesDePlato(plato){
    var mensajesPlato = [];
    var usuariosConMensaje = lista_mensajes.keys();
    for(var j = 0; j<usuariosConMensaje.length; j++){
        var usuario = usuariosConMensaje[j];
        var lista = lista_mensajes.get(usuario);
        for(var i = 0; i<lista.length; i++){

            if(lista_idMensajes.get(lista[i]).oferta == plato && !mensajesPlato.includes(lista[i]) 
            && (usuario == lista_idMensajes.get(lista[i]).vendedor || usuario == lista_idMensajes.get(lista[i]).comprador)){
                mensajesPlato.push(lista[i]);
            }
        }
    }
    return mensajesPlato;
}

function escribirMsg(user, txt, chat, plato){
    var susChats = lista_mensajes.get(user);
    if(susChats == undefined){
        var listaPlatos = getPlatos.getPlatos();
        var vendedor = listaPlatos.get(plato).propietario;
        var nombreChat = chat == "" ? vendedor+'_'+user+'_'+plato : chat;
        addLista_mensajes(user, nombreChat);
        addLista_mensajes(comprador, nombreChat);
        lista_idMensajes.set(nombreChat, {oferta: plato, msgs:[{fecha: Date.now(), emisor: user, texto: txt}], vendedor: vendedor, comprador: user});
    }
    else if(!susChats.includes(chat)){
        var listaPlatos = getPlatos.getPlatos();
        var vendedor = listaPlatos.get(plato).propietario;
        lista_idMensajes.set(nombreChat, {oferta: plato, msgs:[{fecha: Date.now(), emisor: user, texto: txt}], vendedor: vendedor, comprador: user});
        lista_mensajes.get(user).push(chat)
    }
    else{
        var mensajes = lista_idMensajes.get(chat).msgs;
        mensajes.push({fecha: Date.now(), emisor: user, texto: txt});
        lista_idMensajes.get(chat).msgs = mensajes;
    }
    return "OK";
}

function addLista_mensajes(usuario, chat){
    if(lista_mensajes.get(usuario) == undefined){
        lista_mensajes.set(usuario, [chat]);
    }
    else{
        if(!lista_mensajes.get(usuario).includes(chat)){
            lista_mensajes.get(usuario).push(chat);
        }
    }
}

app.get('/', function(req, res) {
    res.send('Bienvenido a la apliación de compra y venta de comidas desarrollada por el grupo 39 de Ingeniería del Software II!');
});
app.get('/listaMensajes/:user', function(req, res) {
    var error = verListaMensajes(req.params.user);
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores listando los mensajes de ' + req.params.user,
            errors: error
        });
    }
    res.status(200).json({
        ok: true,
        body: error
    });
})
app.get('/listaMensajes/:plato', function(req, res) {
    var error = verMensajesDePlato(req.params.plato);
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores listando los mensajes del plato ' + req.params.plato,
            errors: error
        });
    }
    res.status(200).json({
        ok: true,
        body: error
    });
})
app.post('/listaMensajes/:chat', function(req, res) {
    var body = req.body
    var error = escribirMsg(body.usuario, body.texto, req.params.chat, body.plato);
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores escribiendo un mensaje en el chat ' + req.params.chat,
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });
})


////////////////////// PRUEBAS Mensajes //////////////////////
const util = require('util');

console.log(
    "\n\n lista_mensajes -> " + util.inspect(lista_mensajes,{showHidden: false, depth: null}) + 
    "\n\n verListaMensajes('Felix') -> " + verListaMensajes("Felix") +
    "\n\n escribirMsg('Felix', 'Hola amigos', 'Felix_Cesar_Champiñones', 'Champiñones') -> " + escribirMsg('Felix', 'Hola amigos', 'Felix_Cesar_Champiñones', 'Champiñones') +
    "\n\n escribirMsg('Cesar', 'Hola felix', 'Felix_Cesar_Champiñones', 'Champiñones') -> " + escribirMsg('Cesar', 'Hola felix', 'Felix_Cesar_Champiñones', 'Champiñones') +
    "\n\n verMensajesDePlato('Champiñones') -> " + verMensajesDePlato("Champiñones") +
    "\n\n verMensajesDePlato('macarrones') -> " + verMensajesDePlato("macarrones") +
    "\n\n lista_idMensajes -> " + util.inspect(lista_idMensajes,{showHidden: false, depth: null})
    /// Hasta aqui todo funciona ///
)