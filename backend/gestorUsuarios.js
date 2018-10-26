var HashMap = require('hashmap');
const util = require('util');
var nodemailer = require('nodemailer');

var lista_usuarios = new HashMap();

let array_vacio = [];
// Meto dos para hacer pruebas
lista_usuarios.set('felix',{username:'felix', password:'felixpass', mail:'felix.arri@gmail.com', city:'Navalcarnero', contact:'', photo:'', preferences: array_vacio, link:'', validado:false});
lista_usuarios.set('cesar',{username:'cesar', password:'cesarpass', mail:'cesar.herre@gmail.com', city:'Madrid', contact:'', photo:'', preferences: array_vacio, link:'', validado:true});

/**
 * 
 * @param {String} username
 * @param {String} password
 * @return true si es correcto username y password, false e.o.c.
 */
function login(username, password){
    return lista_usuarios.has(username) && (lista_usuarios.get(username).password == password);
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
        var user =  {username:username, password:password, mail:mail, city:city};
        lista_usuarios.set(username,user);
        enviarLink(username,mail);
        return true;
    }
}

function editProfile(username, password, mail, city, contact, photo, preferences){
    var existe = lista_usuarios.has(username) && (lista_usuarios.get(username).password == password);
    if(existe){
        var perfil = lista_usuarios.get(username);
        perfil.username = username;
        perfil.password = password;
        perfil.mail = mail;
        perfil.city = city;
        perfil.contact = contact;
        perfil.photo = photo;
        perfil.preferences = preferences;
        lista_usuarios.set(username, perfil);
    }
   return existe;
}

function enviarLink(username, mail){
    var enlace_aleatorio = "http://practicaComidasISII/123456789";
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

/*
console.log(
    "\n\n login('felix','felixpass') -> " + login('felix','felixpass') + 
    "\n\n lista_usuarios -> " + util.inspect(lista_usuarios) + 
    "\n\n login('noexiste','felixpass') -> " + login('noexiste','felixpass') + 
    "\n\n signup('pedro', 'pedropass','pedro123@gmail.com','Madrid') -> " + signup('pedro', 'pedropass','pedro123@gmail.com','Madrid')  + 
    "\n\n signup('cesar', 'cesarpass','cesitar@gmail.com','Barcelona') -> " + signup('cesar', 'cesarpass','cesitar@gmail.com','Barcelona') +
    "\n\n lista_usuarios -> " + util.inspect(lista_usuarios)
)
*/
// enviarLink("cesar", "cesarherrero252@gmail.com");
