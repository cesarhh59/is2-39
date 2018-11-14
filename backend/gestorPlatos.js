var express = require('express');
var HashMap = require('hashmap');
var ArrayList = require('arraylist');
var getUsuarios = require('./gestorUsuarios.js');
var existe_y_logueado = require('./gestorUsuarios.js');

var lista_platos = new HashMap(); //id_plato, Plato
var usuarios_platos = new HashMap(); //usuario, Platos[]

lista_platos.set('macarrones', {
    titulo: 'macarrones',
    propietario: 'felix',
    valoracion: 5.0,
    vendidos: 1,
    alergeno: [],
    porciones_disponibles: 2,
    localizacion: '',
    hiloMensajes: [],
    estado: true
});

lista_platos.set('Champiñones', {
    titulo: 'macarrones',
    propietario: 'felix',
    valoracion: 5.0,
    vendidos: 1,
    alergeno: [],
    porciones_disponibles: 2,
    localizacion: '',
    hiloMensajes: [],
    estado: true
});
var app = express();
var auxiliar_arraylist = new ArrayList();

auxiliar_arraylist.add('macarrones');
usuarios_platos.set('felix', auxiliar_arraylist);

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
    lista = getUsuPlatos();
    if (lista.has(usuario)) {
        var platos_de_usuario = lista.get(usuario);
        platos_de_usuario.add(plato);
        lista.set(usuario, platos_de_usuario);
        setUsuPlatos(lista);
    }
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
function publicarPlato(propietario, titulo, alergeno, porciones, localizacion, estado, hiloMensajes) {
    if (existe_y_logueado.existe_y_logueado(propietario)) {
        var platos = getPlatos();
        if (platos.has(titulo)) {
            return "El titulo introducido ya está en uso, por favor escriba uno distinto";
        } else {

            platos.set(titulo, {
                titulo: titulo,
                propietario: propietario,
                valoracion: 0.0,
                vendidos: 0,
                alergeno: alergeno,
                vendidos: 0,
                porciones_disponibles: porciones,
                localizacion: localizacion,
                hiloMensajes: hiloMensajes,
                estado: estado
            });
            setPlatos(platos);
            addPlato(propietario, titulo);
            return "OK"
        }
    } else {
        return "No se ha encontrado una sesión activa del usuario reconocido"
    }
}
/**
 * 
 * @param {String} propietario 
 * @param {String} plato 
 * @param {bool} activar  
 */
function activadoPlato(propietario, plato, activar) {
    if (esPropietarioDePlato(propietario, plato)) {
        var platos = getPlatos();
        var objetoPlato = platos.get(plato);
        objetoPlato.estado = activar;
        platos.set(plato, objetoPlato);
        setPlatos(platos);
        return "OK"
    } else {
        return "No se ha encontrado que el usuario \"" + propietario + "\" sea propietarios del plato \"" + plato + "\"";
    }
}
/**
 * 
 * @param {String} propietario 
 * @param {String} plato 
 */
function concluirPlato(propietario, plato) {
    return activadoPlato(propietario, plato, false);
}
/**
 * 
 * @param {String} propietario 
 * @param {String} plato 
 */
function reactivarPlato(propietario, plato) {
    return activadoPlato(propietario, plato, true);
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
/**
 * 
 * @param {Plato} plato 
 */
function imprimirPlato(plato) {
    return "Título: " + plato.titulo +
        "\nPropietario: " + plato.propietario +
        "\nValoración: " + plato.valoracion +
        "\nVendidos: " + plato.vendidos +
        "\nAlergenos: " + plato.alergeno +
        "\nPorciones disponibles: " + plato.porciones_disponibles +
        "\nLocalización: " + plato.localizacion;
}

function verListaOfertas() {
    var resultado = "Los platos disponibles son los siguientes:";
    var lista = getPlatos();
    var indice = 1;
    for (var valor of lista.values()) {
        if (valor.estado == true) {
            resultado += "\n" + indice + ". " + valor.titulo;
            indice++;
        }
    }
    return resultado;
}

function valorarPlato(nombrePlato, valoracion) {
    var platos = getPlatos();
    if (platos.has(nombrePlato)) {
        var plato = platos.get(nombrePlato);
        var oldValoracion = plato.valoracion;
        var vendidos = plato.vendidos;
        var dividendo = (oldValoracion * vendidos) + valoracion;
        vendidos++;
        var media = dividendo / vendidos;
        plato.vendidos = vendidos;
        plato.valoracion = media;
        platos.set(nombrePlato, plato);
        setPlatos(platos);
        return "OK";
    } else {
        return "Lo sentimos, el plato \"" + nombrePlato + "\" no se ha encontrado en nuestra base de datos.";
    }
}

function comprarPlato(nombrePlato, porciones) {
    var platos = getPlatos();
    if (platos.has(nombrePlato)) {
        if (platos.get(nombrePlato).porciones_disponibles >= porciones) {
            platos.get(nombrePlato).porciones_disponibles -= porciones;
            setPlatos(platos);
            return "OK";
        }
        return "Las porciones pedidas (" + porciones + ") exceden a las existentes (" + platos.get(nombrePlato).porciones_disponibles + "), por favor reformule la propuesta con menos porciones."
    } else {
        return "Lo sentimos, el plato \"" + nombrePlato + "\" no se ha encontrado en nuestra base de datos.";

    }
}
/*
////////////////////// PRUEBAS Platos //////////////////////
const util = require('util');

console.log(
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null}) + 
    "\n\n publicarPlato(propietario, titulo, descripcion, ingredientes, vegetariano, gluten, lactosa, porciones, latitud, longitud) -> " 
    + publicarPlato('felix', 'filete de ternera', false, false, false, 4, 45.6785, -3.4336) + 
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null}) + 
    "\n\n verListaOfertas -> " + verListaOfertas() +
    "\n\n concluirPlato('felix', 'macarrones')-> " + concluirPlato('felix', 'macarrones') +
    "\n\n verListaOfertas -> " + verListaOfertas() +
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null}) +
    "\n\n reactivarPlato('felix', 'macarrones') -> " + reactivarPlato('felix', 'macarrones') +
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null}) +
    "\n\n verListaOfertas -> " + verListaOfertas() +
    "\n\n valorarPlato('macarrones', 8) -> " + valorarPlato('macarrones', 8) +
    "\n\n comprarPlato('macarrones', 3) -> " + comprarPlato('macarrones', 3) +
    "\n\n comprarPlato('macarrones', 2) -> " + comprarPlato('macarrones', 2) +
    "\n\n lista_platos -> " + util.inspect(lista_platos,{showHidden: false, depth: null})

    /// Hasta aqui todo funciona ///
)
*/
// Rutas de gestor platos

app.get('/', function(req, res) {
    res.send('Bienvenido a la apliación de compra y venta de comidas desarrollada por el grupo 39 de Ingeniería del Software II!');
});
app.get('/listaPlatos', function(req, res) {
    return res.status(200).json({
        ok: true,
        platos: lista_platos.values()
    });

})
app.post('/listaPlatos', (req, res) => {
    var body = req.body;


    var error = publicarPlato(body.propietario, body.titulo,
        body.alergeno, body.porciones_disponibles, body.localizacion, body.estado, body.hiloMensajes)
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

app.post('/compraPlato', (req, res) => {
    var body = req.body;


    var error = comprarPlato(body.plato, body.porciones)
    if (error != 'OK') {
        return res.status(200).json({
            ok: false,
            mensaje: 'Se han producido errores en la compra de un plato',
            errors: error
        });
    }
    res.status(201).json({
        ok: true,
        body: error
    });

});

app.post('/valorarPlato', (req, res) => {
    var body = req.body;


    var error = valorarPlato(body.plato, body.valoracion)
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

app.post('/activarPlato', (req, res) => {
    var body = req.body;


    var error = reactivarPlato(body.propietario, body.plato)
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

app.post('/desactivarPlato', (req, res) => {
    var body = req.body;


    var error = concluirPlato(body.propietario, body.plato)
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

app.get('/buscaPlato/:id', (req, res) => {

    res.send(buscarPlato(req.params.id));

});

module.exports = app;