var express = require('express');
var HashMap = require('hashmap');
var getPlatos = require("./gestorPlatos.js");

var app = express();
// Hashmap de usuarios, dentro de cada usuario: Hashmap de mensajes, con key: idMensaje y value: mensaje.
var lista_idMensajes = new HashMap(); //lista de los ids de mensajes activos de cada usuario (k:idMensaje, v:array de los mensajes)
var lista_mensajes = new HashMap(); //lista de los mensajes activos de cada usuario
// Ejemplos para pruebas:
lista_idMensajes.set("Felix_Cesar_macarrones", { oferta: "macarrones", msgs: [{ fecha: "1544195950732", emisor: "Felix", texto: "Hola!" }], vendedor: "Cesar", comprador: "Felix" }); // ID: emisor+receptor+oferta
lista_idMensajes.set("Felix_Cesar_Champiñones", { oferta: "Champiñones", msgs: [{ fecha: "1544195950732", emisor: "Felix", texto: "Ey!" }], vendedor: "Cesar", comprador: "Felix" }); // ID: emisor+receptor+oferta

lista_mensajes.set("Felix", ['Felix_Cesar_macarrones', 'Felix_Cesar_Champiñones']);
lista_mensajes.set("Cesar", ['Felix_Cesar_macarrones', 'Felix_Cesar_Champiñones']);

function verListaChats(usuario) {
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
        lista_idMensajes.set(nombreChat, { oferta: plato, msgs: [{ fecha: Date.now(), emisor: user, texto: txt }], vendedor: vendedor, comprador: user });
        lista_mensajes.get(user).push(chat)
    } else {
        var mensajes = lista_idMensajes.get(chat).msgs;
        mensajes.push({ fecha: Date.now(), emisor: user, texto: txt });
        lista_idMensajes.get(chat).msgs = mensajes;
    }
    return "OK";
}

function addLista_mensajes(usuario, chat) {
    if (lista_mensajes.get(usuario) == undefined) {
        lista_mensajes.set(usuario, [chat]);
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