var HashMap = require('hashmap');
var arraylist = require('arraylist');
var getUsuarios = require('./gestorUsuarios.js');
var existe_y_logueado = require('./gestorUsuarios.js');

var lista_platos = new HashMap(); //id_plato, Plato
var usuarios_platos = new HashMap(); //usuario, Platos[]

lista_platos.set('macarrones', {titulo: 'macarrones', propietario: 'felix', descripcion: 'A la boloñesa', ingredientes:['macarrones','tomate','carne'], valoracion: 5.0, activo: true, vegetariano: false, lactosa: false, gluten: true, vendidos: 1, porciones_disponibles: 2, localizacion:[45.6785,-3.4336]});
var lista_auxiliar_arraylist = new ArrayList();
lista_auxiliar_arraylist.add('macarrones');
usuarios_platos.set('felix', lista_auxiliar_arraylist);


function getUsuPlatos(){
    return usuarios_platos;
}

function setUsuPlatos(listaNueva){
    usuarios_platos = listaNueva;
}

//add plato a usuarios_platos
function addPlato(usuario, plato){
    lista = getUsuPlatos();
    if(lista.has(usuario)){
        var platos_de_usuario = lista.get(usuario);
        platos_de_usuario.add(plato);
        lista.set(usuario, platos_de_usuario);
        setUsuPlatos(lista);
    }
}

function getPlatos(){
    return lista_platos;
}

function setPlatos(nuevaListaPlatos){
    lista_platos = nuevaListaPlatos;
}

function publicarPlato(propietario, titulo, descripcion, ingredientes, vegetariano, gluten, lactosa, porciones, latitud, longitud){
    if(existe_y_logueado.existe_y_logueado(propietario)){
        var platos = getPlatos();
        if(platos.has(titulo)){
            return "El titulo introducido ya está en uso, por favor escriba uno distinto";
        }
        else{
            platos.set(titulo, {titulo: titulo, propietario: propietario, descripcion: descripcion, ingredientes: ingredientes, valoracion: 0.0, activo: true, vegetariano: vegetariano, gluten: gluten, lactosa: lactosa, vendidos: 0, porciones_disponibles: porciones, localizacion:[latitud, longitud]});
            setPlatos(platos);
            addPlato(propietario, titulo);
            return "El plato \"" + titulo +"\" ha sido incluido" 
        }
    }
    else{
        return "No se ha encontrado una sesión activa del usuario reconocido"
    }
}