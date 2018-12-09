var express = require('express');
var HashMap = require('hashmap');
var getPlatos = require("./gestorPlatos.js");

var app = express();
// Hashmap de usuarios, dentro de cada usuario: Hashmap de mensajes, con key: idMensaje y value: mensaje.
var lista_idMensajes = new HashMap(); //lista de los ids de mensajes activos de cada usuario (k:idMensaje, v:array de los mensajes)
var lista_mensajes = new HashMap(); //lista de los mensajes activos de cada usuario
// Ejemplos para pruebas:
lista_idMensajes.set("Cesar_Felix_macarrones", { oferta: "macarrones", msgs: [{ fecha: "1544195950732", emisor: "Felix", texto: "Hola!" }], vendedor: "Cesar", comprador: "Felix" }); // ID: emisor+receptor+oferta
lista_idMensajes.set("Cesar_Felix_Champiñones", { oferta: "Champiñones", msgs: [{ fecha: "1544195950732", emisor: "Felix", texto: "Ey!" }], vendedor: "Cesar", comprador: "Felix" }); // ID: emisor+receptor+oferta
lista_idMensajes.set('Cesar_Adrian_Champiñones', { oferta: 'Champiñones', msgs: [ { fecha: 1544346325849, emisor: 'Adrian', texto: 'Hola cesar' } ], vendedor: 'Cesar', comprador: 'Adrian' });

lista_mensajes.set("Felix", ['Cesar_Felix_macarrones', 'Cesar_Felix_Champiñones']);
lista_mensajes.set("Cesar", ['Cesar_Felix_macarrones', 'Cesar_Felix_Champiñones']);
lista_mensajes.set("Adrian", ['Cesar_Adrian_Champiñones']);

function verListaChats(usuario) {
    console.log("ver lista de chats del usuario " + usuario);
    if (lista_mensajes.get(usuario) == undefined) {
        return [];
    } else {
        var resultado = [];
        var chats = lista_mensajes.get(usuario);
        for (var i = 0; i < chats.length; i++) {
            resultado.push(lista_idMensajes.get(chats[i]));
        }
        return chats;
    }
}

function verListaChatsPlato(plato) {
    console.log("ver lista de chats del plato " + plato);
    var mensajesPlato = [];
    var usuariosConMensaje = lista_mensajes.keys();
    for (var j = 0; j < usuariosConMensaje.length; j++) {
        var usuario = usuariosConMensaje[j];
        var lista = lista_mensajes.get(usuario);
        for (var i = 0; i < lista.length; i++) {
            if (lista_idMensajes.get(lista[i]).oferta == plato && !mensajesPlato.includes(lista_idMensajes.get(lista[i])) &&
                (usuario == lista_idMensajes.get(lista[i]).vendedor || usuario == lista_idMensajes.get(lista[i]).comprador)) {
                mensajesPlato.push(lista_idMensajes.get(lista[i]));
            }
        }
    }
    return mensajesPlato;
}

function escribirMsg(user, txt, chat, plato, lista_platos) {
    console.log("escribir mensaje " + user + ": " + txt + ", chat: " + chat + " , plato: " + plato);
    var susChats = lista_mensajes.get(user);
    if (susChats == undefined) {
        var listaPlatos = lista_platos == "" ? getPlatos.getPlatos() : lista_platos;
        var vendedor = listaPlatos.get(plato).propietario;
        var nombreChat = chat == "" ? vendedor + '_' + user + '_' + plato : chat;
        addLista_mensajes(user, nombreChat);
        addLista_mensajes(vendedor, nombreChat);
        lista_idMensajes.set(nombreChat, { oferta: plato, msgs: [{ fecha: Date.now(), emisor: user, texto: txt }], vendedor: vendedor, comprador: user });
    } else if (!susChats.includes(chat)) {
        var listaPlatos = lista_platos == "" ? getPlatos.getPlatos() : lista_platos;
        var vendedor = listaPlatos.get(plato).propietario;
        var nombreChat = chat == "" ? vendedor + '_' + user + '_' + plato : chat;
        lista_idMensajes.set(nombreChat, { oferta: plato, msgs: [{ fecha: Date.now(), emisor: user, texto: txt }], vendedor: vendedor, comprador: user });
        if(!lista_mensajes.get(user).includes(nombreChat)){
            lista_mensajes.get(user).push(nombreChat);
        }
        if(!lista_mensajes.get(vendedor).includes(nombreChat)){
            lista_mensajes.get(vendedor).push(nombreChat);
        }
    } else {
        var mensajes = lista_idMensajes.get(chat).msgs;
        mensajes.push({ fecha: Date.now(), emisor: user, texto: txt });
        lista_idMensajes.get(chat).msgs = mensajes;
    }
    return "OK";
}

function addLista_mensajes(usuario, chat) {
    if (lista_mensajes.get(usuario) == undefined) {
        if(chat == ""){
            lista_mensajes.set(usuario, []);
        }
        else{
            lista_mensajes.set(usuario, [chat]);
        }
    } else {
        if (!lista_mensajes.get(usuario).includes(chat)) {
            lista_mensajes.get(usuario).push(chat);
        }
    }
}

function leerMsg(nombre_chat) {
    if (lista_idMensajes.get(nombre_chat) == undefined) {
        return "El chat \"" + nombre_chat + "\" no existe";
    } else {
        return lista_idMensajes.get(nombre_chat).msgs;
    }
}
/*
////////////////////// PRUEBAS MENSAJES //////////////////////
var util = require('util');
console.log(
    "\n\n lista_mensajes -> " + util.inspect(lista_mensajes,{showHidden: false, depth: null}) + 
    "\n\n lista_idMensajes -> " + util.inspect(lista_idMensajes,{showHidden: false, depth: null}) +
    "\n\n verListaChats('Felix') -> " + verListaChats("Felix") +
    "\n\n escribirMsg('Felix', 'Hola amigos', 'Cesar_Felix_Champiñones', 'Champiñones') -> " + escribirMsg('Felix', 'Hola amigo', 'Cesar_Felix_Champiñones', 'Champiñones',"") +
    "\n\n escribirMsg('Cesar', 'Hola felix', 'Cesar_Felix_Champiñones', 'Champiñones') -> " + escribirMsg('Cesar', 'Hola felix', 'Cesar_Felix_Champiñones', 'Champiñones',"") +
    "\n\n escribirMsg('Adrian', 'Hola cesar', '', 'Champiñones','') -> " + escribirMsg('Adrian', 'Hola quiero comprar', '', 'Champiñones','') +
    "\n\n verListaChatsPlato('Champiñones') -> " + verListaChatsPlato("Champiñones") +
    "\n\n verListaChatsPlato('macarrones') -> " + verListaChatsPlato("macarrones") +
    "\n\n leerMsg('Cesar_Felix_Champiñones') -> " + util.inspect(leerMsg("Cesar_Felix_Champiñones"),{showHidden: false, depth: null}) +
    "\n\n lista_idMensajes -> " + util.inspect(lista_idMensajes,{showHidden: false, depth: null})
    /// Hasta aqui todo funciona ///
)*/

app.get('/', function(req, res) {
    res.send('Bienvenido a la apliación de compra y venta de comidas desarrollada por el grupo 39 de Ingeniería del Software II!');
});
app.get('/listaChats/:user', function(req, res) {
    var error = verListaChats(req.params.user);
    res.status(200).json({
        ok: true,
        body: error
    });
})

app.get('/listaMensajesPlatos/:plato', function(req, res) {
    var error = verListaChatsPlato(req.params.plato);
    res.status(200).json({
        ok: true,
        body: error
    });
})
app.post('/listaMensajes/:chat', function(req, res) {
    var body = req.body
    var error = escribirMsg(body.user, body.msg, req.params.chat, body.plato, "");
    res.status(201).json({
        ok: true,
        body: error
    });
})
app.get('/listaMensajes/:chat/', function(req, res) {
    var error = leerMsg(req.params.chat);
    res.status(200).json({
        ok: true,
        body: error
    });
})

module.exports = app;
module.exports.escribirMsg = escribirMsg;
module.exports.addLista_mensajes = addLista_mensajes;