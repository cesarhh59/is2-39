var HashMap = require('hashmap');
var ArrayList = require('arraylist');
var nodemailer = require('nodemailer');


//////////////////////////////////////////// DATOS PLATOS ////////////////////////////////////////////
var lista_platos = new HashMap(); //id_plato, Plato
var usuarios_platos = new HashMap(); //usuario, Platos[]
lista_platos.set('macarrones', {titulo: 'macarrones', propietario: 'felix', valoracion: 5.0, activo: true, vegetariano: false, lactosa: false, gluten: true, vendidos: 1, porciones_disponibles: 2, localizacion:[45.6785,-3.4336]});
var auxiliar_arraylist = new ArrayList();
auxiliar_arraylist.add('macarrones');
usuarios_platos.set('felix', auxiliar_arraylist);
//////////////////////////////////////////// DATOS USUARIOS ////////////////////////////////////////////
var lista_usuarios = new HashMap();
lista_usuarios.set('felix',{username:'felix', password:'felixpass', mail:'felix.arri@gmail.com', city:'Navalcarnero', link:'', validado:false, logueado:false});
lista_usuarios.set('cesar',{username:'cesar', password:'cesarpass', mail:'cesar.herre@gmail.com', city:'Madrid', link:'', validado:true, logueado:false});


//////////////////////////////////////////// FUNCIONES PLATOS ////////////////////////////////////////////
function getUsuPlatos(){
    return usuarios_platos;
}
/**
 * 
 * @param {HashMap} listaNueva 
 */
function setUsuPlatos(listaNueva){
    usuarios_platos = listaNueva;
}
function getPlatos(){
    return lista_platos;
}
/**
 * 
 * @param {HashMap} nuevaListaPlatos 
 */
function setPlatos(nuevaListaPlatos){
    lista_platos = nuevaListaPlatos;
}
/**
 * 
 * @param {String} usuario 
 * @param {String} plato 
 */
function addPlato(usuario, plato){ //add plato a usuarios_platos
    lista = getUsuPlatos();
    if(lista.has(usuario)){
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
function esPropietarioDePlato(propietario, plato){
    var lista = getUsuPlatos();
    if(lista.has(propietario)){ //Usuario tiene algun plato
        return lista.get(propietario).contains(plato);
    }
    return false;
}
/**
 * 
 * @param {String} propietario 
 * @param {String} titulo 
 * @param {String} descripcion 
 * @param {String[]} ingredientes 
 * @param {boolean} vegetariano 
 * @param {boolean} gluten 
 * @param {boolean} lactosa 
 * @param {int} porciones 
 * @param {double} latitud 
 * @param {double} longitud 
 */
function publicarPlato(propietario, titulo, vegetariano, gluten, lactosa, porciones, latitud, longitud){
    if(existe_y_logueado(propietario) || true){
        var platos = getPlatos();
        if(platos.has(titulo)){
            return "El titulo introducido ya está en uso, por favor escriba uno distinto";
        }
        else{
            platos.set(titulo, {titulo: titulo, propietario: propietario, valoracion: 0.0, activo: true, vegetariano: vegetariano, gluten: gluten, lactosa: lactosa, vendidos: 0, porciones_disponibles: porciones, localizacion:[latitud, longitud]});
            setPlatos(platos);
            addPlato(propietario, titulo);
            return "El plato \"" + titulo +"\" ha sido incluido" 
        }
    }
    else{
        return "No se ha encontrado una sesión activa del usuario reconocido"
    }
}
/**
 * 
 * @param {String} propietario 
 * @param {String} plato 
 * @param {bool} activar  
 */
function activadoPlato(propietario, plato, activar){
    if(esPropietarioDePlato(propietario,plato)){
        var platos = getPlatos();
        var objetoPlato = platos.get(plato);
        objetoPlato.activo = activar;
        platos.set(plato, objetoPlato);
        setPlatos(platos);
        if(activar){
            return "La oferta de \"" + plato + "\" ha sido reactivada."
        }
        return "La oferta de \"" + plato + "\" ha sido desactivada."
    }
    else{
        return "No se ha encontrado que el usuario \"" + propietario + "\" sea propietarios del plato \"" + plato + "\"";
    }
}
/**
 * 
 * @param {String} propietario 
 * @param {String} plato 
 */
function concluirPlato(propietario, plato){
    return activadoPlato(propietario, plato, false);
}
/**
 * 
 * @param {String} propietario 
 * @param {String} plato 
 */
function reactivarPlato(propietario, plato){
    return activadoPlato(propietario, plato, true);
}
/**
 * 
 * @param {String} plato 
 */
function buscarPlato(plato){
    var platos = getPlatos();
    if(platos.has(plato)){
        return "El plato que buscas es el siguiente:\n" + imprimirPlato(platos.get(plato));
    }
    else{
        return "No se ha encontrado ninguna coincidencia de \"" + plato + "\" en los platos del sistema."
    }
}
/**
 * 
 * @param {Plato} plato 
 */
function imprimirPlato(plato){
    return "Título: " + plato.titulo +
            "\nPropietario: " + plato.propietario +
            "\nValoración: " + plato.valoracion +
            "\nVegetariano: " + plato.vegetariano +
            "\nContiene gluten: " + plato.gluten + 
            "\nContiene lactosa: " + plato.lactosa +
            "\nVendidos: " + plato.vendidos +
            "\nPorciones disponibles: " + plato.porciones_disponibles +
            "\nLocalización: " + plato.localizacion;
}
function verListaOfertas(){
    var resultado = "Los platos disponibles son los siguientes:";
    var lista = getPlatos();
    var indice = 1;
    for(var valor of lista.values()){
        if(valor.activo == true){
            resultado += "\n" + indice + ". " + valor.titulo;
            indice++;
        }
    }
    return resultado;
}
function valorarPlato(nombrePlato, valoracion){
    var platos = getPlatos();
    if(platos.has(nombrePlato)){
        var plato = platos.get(nombrePlato);
        var oldValoracion = plato.valoracion;
        var vendidos = plato.vendidos;
        var dividendo = (oldValoracion*vendidos) + valoracion;
        vendidos++;
        var media = dividendo / vendidos;
        plato.vendidos = vendidos;
        plato.valoracion = media;
        platos.set(nombrePlato, plato);
        setPlatos(platos);
        return "Usted ha valorado el plato \"" + nombrePlato + "\" con " + valoracion + " puntos.\nLa valoración actual del palto es " + media;
    }
    else{
        return "Lo sentimos, el plato \"" + nombrePlato + "\" no se ha encontrado en nuestra base de datos.";
    }
}
function comprarPlato(nombrePlato, porciones){
    var platos = getPlatos();
    if(platos.has(nombrePlato)){
        if(platos.get(nombrePlato).porciones_disponibles >= porciones){
            platos.get(nombrePlato).porciones_disponibles -= porciones;
            setPlatos(platos);
            return "Ha comprado con éxito " + porciones + " porciones de " + nombrePlato;
        }
        return "Las porciones pedidas (" + porciones + ") exceden a las existentes (" + platos.get(nombrePlato).porciones_disponibles + "), por favor reformule la propuesta con menos porciones."
    }
    else{
        return "Lo sentimos, el plato \"" + nombrePlato + "\" no se ha encontrado en nuestra base de datos.";

    }
}
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

//////////////////////////////////////////// FUNCIONES USUARIOS ////////////////////////////////////////////
function getUsuarios(){
    return lista_usuarios;
}
function existe_y_logueado(username){
    return lista_usuarios.has(username) && lista_usuarios.get(username).logueado == true;
}
/**
 * 
 * @param {String} username
 * @param {String} password
 * @return true si es correcto username y password, false e.o.c.
 */
function login(username, password){
    const resultado = lista_usuarios.has(username) && (lista_usuarios.get(username).password == password);
    if(resultado){
        lista_usuarios.get(username).logueado = true;
    }
    return resultado;
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
        var user =  {username:username, password:password, mail:mail, city:city, logueado:true};
        lista_usuarios.set(username,user);
        enviarLink(username,mail);
        return true;
    }
}
/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @param {String} mail 
 * @param {String} city 
 * @param {String} contact 
 * @param {String} photo 
 * @param {String[]} preferences 
 */
function editProfile(username, password, mail, city){
    var existe = lista_usuarios.has(username) && (lista_usuarios.get(username).password == password);
    var existe_y_logueado = existe && lista_usuarios.get(username).logueado == true;
    if(existe_y_logueado){
        var perfil = lista_usuarios.get(username);
        perfil.username = username;
        perfil.password = password;
        perfil.mail = mail;
        perfil.city = city;
        lista_usuarios.set(username, perfil);
    }
   return existe_y_logueado;
}
/**
 * 
 * @param {String} username 
 * @param {String} mail 
 */
function enviarLink(username, mail){
    var enlace_aleatorio = "http://localhost/" + username + "/" + Math.random().toString(36).substring(7);;
    var mensaje = "Te has dado de alta en la plataforma de compra-venta de comidas caseras, con el nombre de usuario: " 
    + username + "\n\nPara confirmar que eres tú, por favor, haga click en el siguiente enlace:\n\n" + enlace_aleatorio;
    console.log("Se envia un correo a " + mail);
    var usuario = lista_usuarios.get(username);
    usuario.link = enlace_aleatorio;
    lista_usuarios.set(username, usuario);
    sendEmail(mensaje, mail);
}
//Cuando el usuario hace click en el link
function validar(username, link){
    var esLink = lista_usuarios.has(username) && lista_usuarios.get(username).link == link;
    if(esLink){
        lista_usuarios.get(username).validado = true;
    }
    return esLink;
}
/**
 * 
 * @param {String} mensaje 
 * @param {String} mail 
 */
function sendEmail(mensaje, mail){
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
      
      transporter.sendMail(mailOptions, function(error, info){
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
function logout(username){
    const resultado = lista_usuarios.has(username) && lista_usuarios.get(username).logueado == true;
    if(lista_usuarios.has(username)){
        lista_usuarios.get(username).logueado = false;
    }
    return resultado;
}
/**
 * 
 * @param {String} username 
 * @param {String} password 
 */
function darDeBaja(username, password){
    const resultado = lista_usuarios.has(username) && lista_usuarios.get(username).password == password && lista_usuarios.get(username).logueado == true;
    if(resultado){
        lista_usuarios.remove(username);
    }
    return resultado;
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
