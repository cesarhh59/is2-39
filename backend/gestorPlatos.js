var express = require('express');
var HashMap = require('hashmap');
var ArrayList = require('arraylist');
var getUsuarios = require('./gestorUsuarios.js');
var getAlergenos = require('./gestorUsuarios.js');
var getLocalizacion = require('./gestorUsuarios.js');
var getPreferencias = require('./gestorUsuarios.js');
var escribirMsg = require('./gestorMensajes.js');
var addLista_mensajes = require('./gestorMensajes.js');

const util = require('util');

var lista_platos = new HashMap(); //id_plato, Plato
var usuarios_platos = new HashMap(); //usuario, Platos[]
var platos_comprados_por_usuario = new HashMap(); //Usuario, Platos[]

lista_platos.set('macarrones', {
    titulo: 'macarrones',
    porciones: 4,
    localizacion: 'Soria',
    disponibles: true,
    propietario: 'Cesar',
    estado: true,
    valoracion: 4,
    alergenos: [],
    preferencias: []
});
lista_platos.set('Cocido', {
    titulo: 'Cocido',
    porciones: 6,
    localizacion: 'Madrid',
    disponibles: true,
    propietario: 'Felix',
    estado: true,
    valoracion: 6,
    alergenos: [],
    preferencias: []
});
lista_platos.set('paella', {
    titulo: 'paella',
    porciones: 4,
    localizacion: 'Madrid',
    disponibles: true,
    propietario: 'Felix',
    estado: true,
    valoracion: 7,
    alergenos: [],
    preferencias: []
});
lista_platos.set('espaguetis carbonara', {
    titulo: 'espaguetis carbonara',
    porciones: 8,
    localizacion: 'Madrid',
    disponibles: true,
    propietario: 'Cesar',
    estado: true,
    valoracion: 6,
    alergenos: ['lactosa', 'gluten'],
    preferencias: ['Vegetariano']
});
lista_platos.set('Champiñones', {
    titulo: 'Champiñones',
    porciones: 4,
    localizacion: 'Madrid',
    disponibles: true,
    propietario: 'Cesar',
    estado: true,
    valoracion: 4,
    alergenos: ['lactosa'],
    preferencias: ['Vegetariano']
});
lista_platos.set('Rabo de toro', {
    titulo: 'Rabo de toro',
    porciones: 12,
    localizacion: 'Soria',
    disponibles: true,
    propietario: 'Felix',
    estado: true,
    valoracion: 4,
    alergenos: ['lactosa'],
    preferencias: []
});
lista_platos.set('Gazpacho', {
    titulo: 'Gazpacho',
    porciones: 8,
    localizacion: 'Soria',
    disponibles: true,
    propietario: 'Felix',
    estado: true,
    valoracion: 5,
    alergenos: ['gluten'],
    preferencias: ['Vegetariano']
});
lista_platos.set('Pastel de carne', {
    titulo: 'Pastel de carne',
    porciones: 2,
    localizacion: 'Soria',
    disponibles: true,
    propietario: 'Cesar',
    estado: true,
    valoracion: 4,
    alergenos: ['gluten'],
    preferencias: ['Americano']
});
lista_platos.set('Sopa de ajo', {
    titulo: 'Sopa de ajo',
    porciones: 2,
    localizacion: 'Madrid',
    disponibles: true,
    propietario: 'Cesar',
    estado: true,
    valoracion: 4,
    alergenos: ['gluten'],
    preferencias: ['Vegetariano']
});
lista_platos.set('Sopa de cocido', {
    titulo: 'Sopa de cocido',
    porciones: 9,
    localizacion: 'Soria',
    disponibles: true,
    propietario: 'Felix',
    estado: true,
    valoracion: 4,
    alergenos: [],
    preferencias: ['Vegetariano']
});
var app = express();
var auxiliar_arraylist = new ArrayList();
auxiliar_arraylist.add('macarrones');
auxiliar_arraylist.add('Champiñones');
auxiliar_arraylist.add('Sopa de ajo');
auxiliar_arraylist.add('Pastel de carne');
auxiliar_arraylist.add('espaguetis carbonara');
usuarios_platos.set('Cesar', auxiliar_arraylist);
usuarios_platos.set('Felix', ["Gazpacho","Rabo de toro","paella","Cocido"]);

function getUsuPlatos() {
    return usuarios_platos;
}
/**
 * 
 * @param {HashMap} listaNueva 
 */
function setUsuPlatos(listaNueva) {
    usuarios_platos = listaNueva;
}

function getPlatos() {
    return lista_platos;
}
/**
 * 
 * @param {HashMap} nuevaListaPlatos 
 */
function setPlatos(nuevaListaPlatos) {
    lista_platos = nuevaListaPlatos;
}
/**
 * 
 * @param {String} usuario 
 * @param {String} plato 
 */
function addPlato(usuario, plato) { //add plato a usuarios_platos
    console.log("Se añade el plato " + plato + " al usuario " + usuario)
    lista = getUsuPlatos();
    if(lista.has(usuario)){
        var platos_de_usuario = lista.get(usuario);
        platos_de_usuario.push(plato);
        lista.set(usuario, platos_de_usuario);
        setUsuPlatos(lista);
    }
    else{
        lista.set(usuario, [plato])
    }
}

function get_platos_comprados_por_usuario() {
    return platos_comprados_por_usuario;
}

function set_platos_comprados_por_usuario(hash) {
    platos_comprados_por_usuario = hash;
}

function addUsuario_platos_comprados_por_usuario(usuario, lista) {
    if (!platos_comprados_por_usuario.has(usuario)) {
        platos_comprados_por_usuario.set(usuario, lista);
        return true;
    }
    return false;
}
/**
 * 
 * @param {String} propietario 
 * @param {String} plato 
 */
function esPropietarioDePlato(propietario, plato) {
    var lista = getUsuPlatos();
    if (lista.has(propietario)) { //Usuario tiene algun plato
        return lista.get(propietario).contains(plato);
    }
    return false;
}
/**
 * 
 * @param {String} propietario 
 * @param {String} titulo 
 * @param {String[]} alergeno 
 * @param {String} porciones 
 * @param {String} localizacion 
 * @param {String} estado 
 * @param {String[]} hiloMensajes 
 */
function publicarPlato(propietario, titulo, alergeno, porciones, localizacion, estado, hiloMensajes, preferencias) {
    console.log("Se entra a publicar plato, propietario " + propietario)
    console.log("titulo: " + titulo)
    console.log("alergeno: " + alergeno)
    console.log("porciones: " + porciones)
    console.log("localizacion: " + localizacion)
    console.log("preferencias: " + preferencias)
    var platos = getPlatos();
    if (platos.has(titulo)) {
        return "El titulo introducido ya está en uso, por favor escriba uno distinto";
    } else {
        porciones = porciones == undefined ? 4 : porciones;
        alergeno = alergeno == undefined ? [] : alergeno;
        platos.set(titulo, {
            titulo: titulo,
            porciones: porciones,
            localizacion: localizacion,
            disponibles: true,
            propietario: propietario,
            estado: true,
            valoracion: 0,
            alergenos: alergeno,
            preferencias: preferencias
        });
        setPlatos(platos);
        addPlato(propietario, titulo);
        addLista_mensajes.addLista_mensajes(propietario, "")
        console.log("El usuario " + propietario + " he creado el plato " + titulo);
        console.log(platos.get(titulo));
        return "OK"
    }

}
/**
 * 
 * @param {String} plato 
 * @param {bool} activar  
 */
function activadoPlato(plato, activar) {
    var platos = getPlatos();
    var objetoPlato = platos.get(plato);
    objetoPlato.estado = activar;
    platos.set(plato, objetoPlato);
    setPlatos(platos);
    return "OK"
}
/**
 * 
 * @param {String} plato 
 */
function concluirPlato(plato) {
    console.log("El plato " + plato + " ha sido desactivado");
    return activadoPlato(plato, false);
}
/**
 * 
 * @param {String} plato 
 */
function reactivarPlato(plato) {
    console.log("El plato " + plato + " ha sido activado");
    return activadoPlato(plato, true);
}
/**
 * 
 * @param {String} plato 
 */
function buscarPlato(plato) {
    var platos = getPlatos();
    if (platos.has(plato)) {
        return "El plato que buscas es el siguiente:\n" + imprimirPlato(platos.get(plato));
    } else {
        return "No se ha encontrado ninguna coincidencia de \"" + plato + "\" en los platos del sistema."
    }
}

function valorarPlato(nombrePlato, valoracion) {
    valoracion = parseInt(valoracion, 10);
    console.log("valora el plato " + nombrePlato + " con una valoracion de " + valoracion);
    var platos = getPlatos();
    if (platos.has(nombrePlato)) {
        var plato = platos.get(nombrePlato);
        var oldValoracion = plato.valoracion;
        var vendidos = 4; /*plato.vendidos; // NECESITO SABER CUANTOS SE HAN VENDIDO PARA HACER LA MEDIA*/
        var dividendo = (oldValoracion * vendidos) + valoracion;
        vendidos++;
        var media = dividendo / vendidos;
        // plato.vendidos = vendidos;
        plato.valoracion = media;
        platos.set(nombrePlato, plato);
        setPlatos(platos);
        console.log("El plato " + plato + "ha sido valorado con " + valoracion + " puntos");
        return "OK";
    } else {
        return "Lo sentimos, el plato \"" + nombrePlato + "\" no se ha encontrado en nuestra base de datos.";
    }
}

function comprarPlato(nombrePlato, porciones, comprador) { // NECESITO SABER QUE USUARIO LO HACE PARA LUEGO RECOMENDAR
    var platos = getPlatos();
    if (platos.has(nombrePlato)) {
        if (platos.get(nombrePlato).porciones >= porciones) {
            platos.get(nombrePlato).porciones -= porciones;
            setPlatos(platos);
            // platos_comprados_por_usuario.get(comprador).push(nombrePlato); // NECESITO SABER QUE USUARIO LO HACE
            // CREAR CHAT
            var primer_mensaje = "Hola! He comprado " + porciones + " porciones de tu plato " + nombrePlato + "!";
            escribirMsg.escribirMsg(comprador, primer_mensaje, '', nombrePlato, lista_platos)
                // CREAR CHAT
            console.log("El plato " + nombrePlato + "ha sido comprado por " + comprador + " porciones: " + porciones);
            return "OK";
        }
        return "Las porciones pedidas (" + porciones + ") exceden a las existentes (" + platos.get(nombrePlato).porciones + "), por favor reformule la propuesta con menos porciones."
    } else {
        return "Lo sentimos, el plato \"" + nombrePlato + "\" no se ha encontrado en nuestra base de datos.";

    }
}

function calcularPuntos(platos) {
    var puntuacion = 0;
    for (var j = 0; j < platos.length; j++) {
        let plato = lista_platos.get(platos[j]);
        puntuacion += plato.valoracion;
    }
    return puntuacion / platos.length;
}
/**
 * 
 * @param {String} alergeno 
 * Si nos dice el alergeno 'lactosa', significa que quiere una lista de platos que no tengan lactosa.
 */
function filtrarPorAlergenos(alergeno) {
    alergeno = parseAlergenos(alergeno);
    console.log("El usuario pide un filtro por alergenos: " + alergeno);
    let listaPlatos = getPlatos().values();
    let listaFiltrada = [];
    for (var i = 0; i < listaPlatos.length; i++) {
        var plato = listaPlatos[i];
        if (!contiene(alergeno, plato.alergenos)) {
            listaFiltrada.push(plato);
        }
    }
    return listaFiltrada;
}

function parseAlergenos(antiguos){
    var resultado = [];
    for(var i = 0; i<antiguos.length; i++){
        if(antiguos[i] == "Lactosa"){
            resultado.push("lactosa");
        }
        else if(antiguos[i] == "Celiaco"){
            resultado.push("gluten");
        }
        else{
            resultado.push(antiguos[i]);
        }
    }
    return resultado;
}
function contiene(elemento, lista) {
    for (var i = 0; i < lista.length; i++) {
        for(var j = 0; j < elemento.length; j++){
            if (elemento[j] == lista[i]) {
                return true;
            }
        }
    }
    return false;
}
/* Para recomendar platos: 
- Tener en cuenta las compras de usuario y la valoración que ha dado
- Recomendar usuarios que haya comprado con buena valoracion
- Siempre filtrando por alergenos
- Localizacion del plato igual al usuario*/
function recomendarPlatos(usuario) {
    console.log("Al usuario " + usuario + " se le dan unas recomendacions");
    var recomendados = [];
    var plato, localizacion_plato = '';
    var alergenos_plato = [];
    var platos = getPlatos();
    var listaPlatos = platos.keys();
    var usuariosPlatos = getUsuPlatos();
    var platosDelUsuario = usuariosPlatos.get(usuario) == undefined ? [] : usuariosPlatos.get(usuario);;
    var usuarios = getUsuarios.getUsuarios();
    var alergenos_usuario = usuarios.get(usuario).alergenos;
    var localizacion_usuario = usuarios.get(usuario).city;
    for (var i = 0; i < listaPlatos.length; i++) {
        plato = listaPlatos[i];
        localizacion_plato = platos.get(plato).localizacion;
        alergenos_plato = platos.get(plato).alergenos;
        /*  - No es plato del mismo usuario
            - El plato esta disponible y activo
            - Localizacion del plato igual a la del usuario
            - Alergenos del plato no coinciden con los del usuario*/
        if (!platosDelUsuario.includes(plato) && platos.get(plato).disponibles == true &&
            platos.get(plato).estado == true && localizacion_plato == localizacion_usuario &&
            !hayElementosIguales(alergenos_plato, alergenos_usuario)) {
            recomendados.push(plato);
        }
    }
    return recomendados;
}

function hayElementosIguales(lista1, lista2) {
    for (var i = 0; i < lista1.length; i++) {
        for (var j = 0; j < lista2.length; j++) {
            if (lista1[i] == lista2[j]) {
                return true;
            }
        }
    }
    return false;
}

function filtrarPorLocalizacion(localizacion) {
    console.log("El usuario pide un filtro por localizacion: " + localizacion);
    var recomendados = [];
    var platos = getPlatos();
    var listaPlatos = platos.keys();
    var plato, localizacion_plato = '';
    for (var i = 0; i < listaPlatos.length; i++) {
        plato = listaPlatos[i];
        localizacion_plato = platos.get(plato).localizacion;
        if (platos.get(plato).disponibles == true &&
            platos.get(plato).estado == true && localizacion_plato == localizacion) {
            recomendados.push(platos.get(plato));
        }
    }
    return recomendados;
}

function filtrarPorAlergenoYLocalizacion(alergeno, localizacion) {
    console.log("El usuario pide un filtro por alergenos y localizacion " + alergeno + "," + localizacion);
    var filtrados = [];
    var listaPorAlergeno = filtrarPorAlergenos(alergeno);
    var listaPorLocalizacion = filtrarPorLocalizacion(localizacion);
    for (var i = 0; i < listaPorAlergeno.length; i++) {
        for (var j = 0; j < listaPorLocalizacion.length; j++) {
            if (listaPorAlergeno[i] == listaPorLocalizacion[j]) {
                filtrados.push(listaPorAlergeno[i]);
            }
        }
    }
    return filtrados;
}

function verListaOfertas() { //Solo muestra las activas
    console.log("verListaOfertas() Solo muestra las activas");
    var ofertasActivas = [];
    var lista = lista_platos.keys();
    for (var i = 0; i < lista.length; i++) {
        if (lista_platos.get(lista[i]) !== undefined && lista_platos.get(lista[i]).estado == true) {
            ofertasActivas.push(lista_platos.get(lista[i]));
        }
    }
    return ofertasActivas;
}

function filtrarPreferencias(alergenos, localizacion, preferencias){
    var listaFiltradaAlergenosLocalizacion = filtrarPorAlergenoYLocalizacion(alergenos, localizacion);
    console.log("Las preferencias del usuario son: " + preferencias)
    if(preferencias.length == 0){
        return listaFiltradaAlergenosLocalizacion;
    }
    var resultado = []
    for(var i = 0; i < listaFiltradaAlergenosLocalizacion.length; i++){
        var platoi = listaFiltradaAlergenosLocalizacion[i];
        var preferPlato = platoi.preferencias;
        for(var j = 0; j < preferencias.length; j++){
            if(preferPlato.includes(preferencias[j])){
                resultado.push(platoi);
            }
        }
    }
    return resultado;
}

// Rutas de gestor platos
app.get('/', function(req, res) {
    res.send('Bienvenido a la apliación de compra y venta de comidas desarrollada por el grupo 39 de Ingeniería del Software II!');
});
app.get('/listaPlatos', function(req, res) {
    var alergenos = req.query.alergenos;
    var localizacion = req.query.location;
    var preferencias = req.query.preferencias;
    var resultado = verListaOfertas();
    if (alergenos && localizacion && localizacion != '' && alergenos != '') {
        console.log("PREFERENCIAS: pide lista platos filtrada por alergenos y localizacion Y PREFERENCIAS");
        alergenos = getAlergenos.getAlergenos(alergenos);
        preferencias = getPreferencias.getPreferencias(localizacion);
        localizacion = getLocalizacion.getLocalizacion(localizacion);
        resultado = filtrarPreferencias(alergenos, localizacion, preferencias);
    } else if (alergenos && alergenos != '') {
        console.log("pide lista platos filtrada por alergenos");
        alergenos = getAlergenos.getAlergenos(alergenos);
        resultado = filtrarPorAlergenos(alergenos);
    } else if (localizacion && localizacion != '') {
        console.log("pide lista platos filtrada por localizacion");
        localizacion = getLocalizacion.getLocalizacion(localizacion);
        resultado = filtrarPorLocalizacion(localizacion);
    }
    // console.log(resultado);

    return res.status(200).json({
        ok: true,
        platos: resultado
    });

})
app.post('/listaPlatos', (req, res) => {
    var body = req.body;
    console.log(body)
    var error = publicarPlato(body.propietario, body.titulo,
        body.alergenos, body.porciones, body.localizacion, body.estado, body.hiloMensajes, body.preferencias)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la creacion de plato',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});
app.get('/listaPlatos/:id/valorar/:valoracion', (req, res) => {
    var error = valorarPlato(req.params.id, req.params.valoracion)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la valoracion de un plato',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});
app.get('/listaPlatos/:id/activar/', (req, res) => {
    var error = reactivarPlato(req.params.id)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la activacion del anuncio de un plato',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});
app.get('/listaPlatos/:id/desactivar/', (req, res) => {
    var error = concluirPlato(req.params.id)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la desactivacion del anuncio de un plato',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});
app.get('/listaPlatos/:id', (req, res) => {
    return res.status(200).json({
        ok: true,
        platos: lista_platos.get(req.params.id)
    });

});
app.get('/listaPlatos/:id/propietario', (req, res) => {
    return res.status(200).json({
        ok: true,
        platos: usuarios_platos.get(req.params.id)
    });

});
app.get('/listaPlatos/:id/comprar/:porciones/:usuario', (req, res) => {
    var error = comprarPlato(req.params.id, req.params.porciones, req.params.usuario) // ESCRIBIR EL PARAMETRO USUARIO COMO ES
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: error,
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});
app.get('/platosRecomendados/:usuario', (req, res) => {
    return res.status(200).json({
        ok: true,
        platos: recomendarPlatos(req.params.usuario)
    });
});
/*
////////////////////// PRUEBAS Platos //////////////////////
const util = require('util');

console.log(
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null}) + 
    "\n\n publicarPlato('Felix', 'filete de ternera', ['gluten'], 12, 'Madrid', true, []) -> " 
    + publicarPlato('Felix', 'filete de ternera', ['gluten'], 12, 'Madrid', true, []) + 
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null}) + 
    "\n\n recomendarPlatos('Adrian') -> " + recomendarPlatos('Adrian') +
    "\n\n recomendarPlatos('Felix') -> " + recomendarPlatos('Felix') +
    "\n\n recomendarPlatos('Cesar') -> " + recomendarPlatos('Cesar')+
    "\n\n filtrarPorAlergenos('lactosa') -> " + filtrarPorAlergenos('lactosa') +
    "\n\n filtrarPorLocalizacion('Madrid') -> " + filtrarPorLocalizacion('Madrid') +
    "\n\n filtrarPorLocalizacion('Soria') -> " + filtrarPorLocalizacion('Soria') +
    "\n\n filtrarPorAlergenoYLocalizacion('gluten','Soria') -> " + filtrarPorAlergenoYLocalizacion('gluten','Soria') +
    "\n\n filtrarPorAlergenoYLocalizacion('gluten','Madrid') -> " + filtrarPorAlergenoYLocalizacion('gluten','Madrid') +
    "\n\n filtrarPorAlergenoYLocalizacion('lactosa','Madrid') -> " + filtrarPorAlergenoYLocalizacion('lactosa','Madrid') +
    "\n\n filtrarPorAlergenoYLocalizacion('lactosa','Soria') -> " + filtrarPorAlergenoYLocalizacion('lactosa','Soria') +
    "\n\n verListaOfertas -> " + util.inspect(verListaOfertas(),{showHidden: false, depth: null}) +
    "\n\n concluirPlato('macarrones')-> " + concluirPlato('macarrones') +
    "\n\n verListaOfertas -> " + util.inspect(verListaOfertas(),{showHidden: false, depth: null}) +
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null}) +
    "\n\n reactivarPlato(macarrones') -> " + reactivarPlato('macarrones') +
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null}) +
    "\n\n verListaOfertas -> " + util.inspect(verListaOfertas(),{showHidden: false, depth: null}) +
    "\n\n valorarPlato('macarrones', 8) -> " + valorarPlato('macarrones', 8) +
    "\n\n comprarPlato('macarrones', 2) -> " + comprarPlato('macarrones', 2, 'Adrian') +
    "\n\n comprarPlato('macarrones', 3) -> " + comprarPlato('macarrones', 3, 'Felix') +
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null})

    /// Hasta aqui todo funciona ///
)*/
module.exports = app;
module.exports.getUsuPlatos = getUsuPlatos;
module.exports.calcularPuntos = calcularPuntos;
module.exports.addUsuario_platos_comprados_por_usuario = addUsuario_platos_comprados_por_usuario
module.exports.getPlatos = getPlatos;