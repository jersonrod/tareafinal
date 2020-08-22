
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCHDJffdvTLFwx9P6VX5DAm7xTVw1xucPA",
    authDomain: "chat-3d96b.firebaseapp.com",
    databaseURL: "https://chat-3d96b.firebaseio.com",
    projectId: "chat-3d96b",
    storageBucket: "chat-3d96b.appspot.com",
    messagingSenderId: "649829236428",
    appId: "1:649829236428:web:c453c90d136b86951e0c69"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();

  console.log('db:' +db);


(() => {
  
  console.log('user: '+ usuario);
 
  var usuario = localStorage.getItem('usuarioLogin');
 
 
  var tabla = document.getElementById("tablaEditar");
 
  console.log('tabla: '+ tabla);
 
  db.collection("perfilUsuarios").where("correo","==", usuario).onSnapshot((querySnapshot) => {
   
   tabla.innerHTML = '';
 
   querySnapshot.forEach((doc) => {
       document.getElementById('fotoP').src = `${doc.data().foto}`;
      
       tabla.innerHTML  += `<a href="#"  data-toggle="modal" onclick="buscaPerfil('${doc.data().correo}')" data-target="#editarRegistro" > Editar Perfil</a><br>
                            <a href="#"  data-toggle="modal" onclick="buscaPerfilClave('${doc.data().correo}')" data-target="#cambiaClave" > Cambiar Contraseña</a>
       `;

       contactos();
       
   });
 
 })
   
 })();

// Funcion que registra los usuarios

function registroUsuarios(){
    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    let nombre = document.getElementById('inputNombre').value;

    console.log(`Email ${email}`);
    console.log(`Password ${password}`);

    if (email.length == 0 || password.length == 0 || nombre.length == 0) {
      alert('El registro tiene datos vacios, revise....')
    }else{

    firebase.auth().createUserWithEmailAndPassword(email, password).then( res =>{
       
        crearPerfil(res.uid, email, nombre);

        document.getElementById('inputEmail').value="";
        document.getElementById('inputPassword').value="";
        document.getElementById('inputNombre').value="";
        alert('Usuario registrado');
  
          $("#registro").modal("hide");
      

    }).catch(function(error) {
        
       // var errorCode = error.code;
       // var errorMessage = error.message;
     
       // console.log(`Error code ${errorCode}`);
       // console.log(`Error message ${errorMessage}`);
        
      });
    }
    //console.log('HIzo un click');
}

// Funcion que Crea Perfil de Usuarios

function crearPerfil(id, correo, nombre) {
      
    if (nombre.length !== 0) {

    db.collection("perfilUsuarios").add({
      correo: correo,
      nombre : nombre,
      foto: ""
    })
    
        .then(function (docRef) {
            console.log("Registro creado con id: ", docRef.id);
           
        })
        .catch(function (error) {
            console.error("Error al guardar registro: ", error);
        });
      } else{
        alert("Los datos no pueden estar nulos");
      }
};

// Funcion que sube las imagenes

function subirImagen(){
  const ref = firebase.storage().ref();
  const archivo = document.querySelector('#foto2').files[0];
  const nombre = new  Date() +'-'+ archivo.name;   
  if(archivo == null){
    alert('Debe seleccionar una Imagen')
  }else{
    const metadata={
      contentType: archivo.type
    }
    const tarea = ref.child(nombre).put(archivo, metadata);
    tarea
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then( url => {
      console.log('url: ' + url);
      alert('Imagen insertada');
      const imageElement = document.querySelector('#image');
      imageElement.src = url;
     
    });
  }
  console.log(ref);
}

// funcion que busca el perfil de los usuarios

function buscaPerfil(correo){
  
    db.collection("perfilUsuarios").where("correo","==", correo).onSnapshot((querySnapshot) => {
    
        querySnapshot.forEach((doc) => {
            
            console.log(`${doc.id} => ${doc.data().nombre} , ${doc.data().correo} ` );
            
            
            document.getElementById('idcorreo').value  = `${doc.id}`;
            document.getElementById('editEmail').value  = `${doc.data().correo}`;
            document.getElementById('editNombre').value = `${doc.data().nombre}`;
            document.getElementById('image').src = `${doc.data().foto}`;
            console.log(`${doc.data().foto}`);
        

        });
  
      })
    }

    //Funcion que Muestra Imagenes

    function mostrarImagen(){

      const ref = firebase.storage().ref('perfilUsuarios');

      ref.on("foto", function(snapshot){
        var datos = snapshot.val();
        var result = "";
        for (var key in datos ){
          result += datos[key].url;

        }
        const imageElement = document.querySelector('#image');
        imageElement.src = result;
      })

      $scope.getImgUrl = function(file) {
        storage.child(file).getDownloadURL().then(function(url) {
          return url;
        }).catch(function(error) {
         
        });
 }

    }

    // Actualizacion de Perfiles de usuarios

function actualizaPerfil(){
      
  
  let id = document.getElementById('idcorreo').value;         
  let correo = document.getElementById('editEmail').value;
  //let password = document.getElementById('inputPassword').value;
  let nombre = document.getElementById('editNombre').value;
  let url = document.getElementById('image').src;

  console.log(id, correo, nombre, url);
  
  db.collection("perfilUsuarios").doc(id).update({
    correo: correo,
    nombre: nombre,
    foto: url
})
.then(function() {
    console.log("Actualización Realizada");
});


}

// Función que hace la conexión de la aplicacion

function login() {
  let email = document.getElementById('loginEmail').value;
  let password = document.getElementById('loginPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(res => {

     
      
     $("#loginApp").modal("hide");
    
     localStorage.setItem('usuarioLogin', email);
     usuarioActual();
     contactos();

     document.getElementById('loginEmail').value = "";
     document.getElementById('loginPassword').value = "";

      console.log(firebase.auth()) ;
  }).catch(function (error) {

     
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(`Error code ${errorCode}`)
      console.log(`Error message ${errorMessage}`)

      alert(`Error al conectarse: ${errorMessage}`);
  });
}

// Función que desconecta el usuario de la aplicación

function logout(){

  firebase.auth().signOut().then(res=>{
    $("#login").modal("hide");
    localStorage.clear();
    window.open('index.html','_self');
   
  });

}

//Funcion que busca el usuario actual conectado

function usuarioActual() {

 var usuario = firebase.auth().currentUser.email;
 
 var tabla = document.getElementById("tablaEditar");

 console.log('tabla: '+ tabla);

 var actualStorage = localStorage.getItem('usuarioLogin');

 console.log('storage: '+ actualStorage);

 db.collection("perfilUsuarios").where("correo","==", usuario).onSnapshot((querySnapshot) => {
  
  tabla.innerHTML = '';

  querySnapshot.forEach((doc) => {
      document.getElementById('fotoP').src = `${doc.data().foto}`;
     
      tabla.innerHTML  += `<a href="#"  data-toggle="modal" onclick="buscaPerfil('${doc.data().correo}')" data-target="#editarRegistro" > Editar Perfil</a><br>
                           <a href="#"  data-toggle="modal" onclick="buscaPerfilClave('${doc.data().correo}')" data-target="#cambiaClave" > Cambiar Contraseña</a>
      `;
  });

 

})

}

// Función que busca el perfil del usuario

function buscaPerfilClave(correo){
  
  db.collection("perfilUsuarios").where("correo","==", correo).onSnapshot((querySnapshot) => {
 
      querySnapshot.forEach((doc) => {
          
          console.log(`${doc.id} => ${doc.data().nombre} , ${doc.data().correo} ` );
          
          
          document.getElementById('idcorreoClave').value  = `${doc.id}`;
          document.getElementById('viewEmail').value  = `${doc.data().correo}`;
          console.log(`${doc.data().foto}`);
       

      });

    })
  }

  // Función que cambia la clave del Usuario

  function cambiaClave(){

    var email = document.getElementById('viewEmail').value;
    var oldPassword = document.getElementById('currentPassword').value;
    var newPassword =  document.getElementById('newPassword').value;

    console.log(email, oldPassword, newPassword);

    firebase.auth()
        .signInWithEmailAndPassword(email, oldPassword)
        .then(function(user) {

            firebase.auth().currentUser.updatePassword(newPassword).then(function(){
                alert('Contraseña cambiada')
             

            }).catch(function(err){
               

                alert('Contraseña  con errores, revise')
            });

        }).catch(function(err){
            
            alert('Contraseña  con errores, revise')
        });

  }

// Función que busca los contactos

function buscaContactos() {
 
  var correoA  = firebase.auth().currentUser.email;
  var consulta = document.getElementById("buscarContacto").value;
  var tabla    = document.getElementById("tablaContactos");

  
 
  console.log('tabla: '+ tabla +' cosulta: '+ consulta);
 
  db.collection("perfilUsuarios").where("correo", ">=" ,consulta).onSnapshot((querySnapshot) => {
   
   tabla.innerHTML = ''; 
  
 

   querySnapshot.forEach((doc) => {

       tabla.innerHTML  += `<div class="modal-dialog-scrollable">
                           
                            <tr>
                            
                            <td style="width:20px height:25px"> 
                            <input type="checkbox" id="posteo" value='${doc.data().correo}'> 
                            </td>
                                                       
                            <td> <a> ${doc.data().correo} </a> </td>
                        </tr>
                        </div>
                     
                        `;                     
             
                   

   });
  
 
 })
 
 }

//Función que busca los contactos seleccionados para añadirlos
 
 function buscaPosteados() {
    
  var selected = new Array();

  var tabla = document.getElementById("tablaContactos");

  var chks = tabla.getElementsByTagName("INPUT");


  for (var i = 0; i < chks.length; i++) {
      if (chks[i].checked) {
       
         
         var correoActual = firebase.auth().currentUser.email;

         db.collection("perfilUsuarios").where("correo", "==" , chks[i].value).onSnapshot((querySnapshot) => {
   
          querySnapshot.forEach((doc) => {

             var correoContacto =  `${doc.data().correo}`;

            if (correoActual != correoContacto) {
            
              crearContacto(correoActual, correoContacto);

              document.getElementById("tablaContactos").value ="";

              $("#addContactos").modal("hide");
              

             console.log(`codigo: ${doc.data().correo} `);
             console.log(correoActual);

            };

          });

        });
        
      }
  }

  
};

// Función que Crea los contactos

function crearContacto(correo, nombre) {
      
  if (nombre.length !== 0 && correo.length !==0) {

  db.collection("contactos").add({
    correo: correo,
    contacto : nombre,
    bloqueado: ""
  })
  
      .then(function (docRef) {
          console.log("Contacto creado con id: ", docRef.id);
          alert('Contacto Creado');
         
      })
      .catch(function (error) {
          console.error("Error al guardar registro: ", error);
      });
    } else{
      alert("Los datos no pueden estar nulos");
    }
};

// Función que busca los contactos

function contactos() {

  var correoA  = firebase.auth().currentUser.email;
  var tabla    = document.getElementById("listaContactos");

 
  db.collection("contactos").where("correo", "==" , correoA).onSnapshot((querySnapshot) => {
   

   tabla.innerHTML = ''; 

   querySnapshot.forEach((doc) => {

      var contacto =  `${doc.data().contacto}`;
      var bloqueado = `${doc.data().bloqueado}`;

      var hora = horaActual();

      db.collection("perfilUsuarios").where("correo", "==" , contacto).onSnapshot((querySnapshot) => {
   
        querySnapshot.forEach((docum) => {

        
          var texto ;
          console.log('bloqueado: '+ bloqueado.value)

          
          var foto = `${docum.data().foto}` || 'img/default_user.png';

          if (bloqueado == 'S' ){

            

          tabla.innerHTML  += ` <div class="salachat" onclick="detalleContactos('${docum.data().correo}')" >
                              
                              <img id="fotoAmigos" src="`+foto+`" alt="foto" class="profile-image">
                         
                              <div id="divAmigos" class="text">
                                  <h6 > ${docum.data().nombre} </h6>
                                  <p id="correoAmigo" class="text-muted ">${docum.data().correo} </p>
                                  
                              </div>
                              <div>
                                  <span class="time small"></span>
                              </div>
                              <div>  
                               <button type="button" onclick="desbloquearContacto('${doc.id}')" class="btn btn-warning btn-sm">
                              Bloqueado
                              </button>
                              
                              <a href="#" data-toggle="modal" data-target="#eliminar"  onclick="reservaId('${doc.id}')" >Eliminar</a>
                              </div>
                             
                          </div><hr>`;
                          
            }else{
              
              tabla.innerHTML  += ` <div class="salachat" onclick="detalleContactos('${docum.data().correo}')" >
                              
              <img id="fotoAmigos" src="`+foto+`" alt="foto" class="profile-image">
              
              <div id="divAmigos" class="text">
                  <h6 > ${docum.data().nombre} </h6>
                  <p id="correoAmigo" class="text-muted ">${docum.data().correo} </p>
               
              </div>
              <div>
                  <span class="time small"></span>
              </div>
              <div>  
               <button type="button" onclick="bloquearContacto('${doc.id}')" class="btn btn-success btn-sm">
              Disponible
              </button>
              
              <a href="#" data-toggle="modal" data-target="#eliminar" onclick="reservaId('${doc.id}')">Eliminar</a>
              </div>
             
          </div><hr>`;
              
                     
            }               
       
    

    

        });

      });

   });
  
 
 })
 

 }

 // Hora actual

 function horaActual(){

  let xfecha = new Date()
  let dHora = xfecha.getHours();
  let dMin  = xfecha.getMinutes();
  
  let dMinF  = dMin < 10 ? '0' + dMin: dMin;
  let dSeg  = xfecha.getSeconds();
  let dSegF  = dSeg < 10 ? '0' + dSeg: dSeg;
 

          let dHoraF = dHora > 12 ? dHora - 12 : dHora;
          
          let amPm = dHora > 12 ? 'P.M.' : 'A.M.';
      
          return(dHoraF +':'+ dMinF + ':' + dSegF+' '+amPm);
        
     
 }

// Bloquear Contactos

function bloquearContacto(id){
  db.collection("contactos").doc(id).update({
    "bloqueado": "S"
})
.then(function() {
    console.log("Usuario Bloqueado");
});

}

// Desbloquear contactos

function desbloquearContacto(id){
  db.collection("contactos").doc(id).update({
    "bloqueado": ""
})
.then(function() {
    console.log("Usuario DesBloqueado");
});

}

// Detalles de un contacto (Datos del perfil)

function detalleContactos(contacto) {

      var tabla = document.getElementById("headerContacto");

      console.log(contacto);

      tabla.innerHTML ="";

      db.collection("perfilUsuarios").where("correo", "==" , contacto).onSnapshot((querySnapshot) => {
   
        querySnapshot.forEach((docum) => {
          
          var foto = `${docum.data().foto}` || 'img/default_user.png';

         tabla.innerHTML  += `<div>
                              <img id="imagenContacto" src="`+foto+`" alt="foto amigos" class="profile-image">
                             
                              <div id="textoContacto" class="text">
                                  <h6 > ${docum.data().nombre} </h6>
                                  <p class="text-muted">${docum.data().correo} </p>
                                  <input  id="correoContacto" type="text" hidden value="${docum.data().correo}">
                                  
                               </div>
                               
                              </div>
                              
                            `;
         
            
       buscaConversacion();
          console.log('contactos:'+ `${docum.id}+','+ ${docum.data().correo} +','+ ${docum.data().nombre}+','+ ${docum.data().foto}`);

        });

      });

       
  
 }

// Enviar mensaje

function enviarChat() {

  var emisor =  firebase.auth().currentUser.email;
  var mensaje = document.getElementById("digitarMensaje").value;
  var receptor = document.getElementById("correoContacto").value;
  

  if (emisor.length != 0 && receptor.length !=0 && mensaje.length !=0 ) {

   

  db.collection("salachat").add({
    emisor: emisor,
    receptor: receptor,
    mensaje: mensaje,
    fecha: Date()
  })
  
      .then(function (docRef) {
          console.log("Mensaje enviado: ", docRef.id);
          
           document.getElementById("digitarMensaje").value = "";

           
        buscaConversacion();
         
      })
      .catch(function (error) {
          console.error("Error al enviar mensaje: ", error);
      });
    } else{
      alert("El Mensaje no puede estar en blanco");
    } 
};

// Buscar conversacion entre dos usuarios

function buscaConversacion() {

  
  var emisor =  firebase.auth().currentUser.email;
  var receptor = document.getElementById("correoContacto").value;

  var tabla = document.getElementById("conversacion");
  

  tabla.innerHTML ="";


  db.collection("salachat")
  .where("emisor", "==" , receptor)
  .where("receptor", "==" , emisor)
  .orderBy('fecha')
  .onSnapshot((querySnapshot) => {

    querySnapshot.forEach((doc) => {

      let xfecha = new Date(`${doc.data().fecha}`);
      
      let dHora = xfecha.getHours();
      let dMin  = xfecha.getMinutes();

      let hora = buscaHora(xfecha);


      tabla.innerHTML +=`
      <div class="chat-panel">
      <div class="row">
          <div class="col-md-6">
          <div>
          <span class="time small float-right"> `+ hora+`</span> </div><br>
              <div class="chat-bubble chat-bubble--left">
              ${doc.data().mensaje}
              </div>
          </div>
      </div>`
      

 
});

});

db.collection("salachat").where("emisor", "==" , emisor).where("receptor", "==" , receptor).orderBy('fecha').onSnapshot((querySnapshot) => {
  
 
    querySnapshot.forEach((docum) => {

      let xfecha = new Date(`${docum.data().fecha}`);
      let dia =  xfecha.getDate() +'/'+ ( xfecha.getMonth() +1) +'/' + xfecha.getFullYear() ;

      let dHora = xfecha.getHours();
      let dMin  = xfecha.getMinutes();

      let hora = buscaHora(xfecha);
      console.log('fecha: '+ dia);
      console.log('hora: '+ hora);


      tabla.innerHTML  += ` <div class="row no-gutters">
               <div class="col-md-5 offset-md-6">
                 <span class="time small"> `+ hora+`</span>
                   <div class="chat-bubble2 chat-bubble--right">
                 
                   ${docum.data().mensaje}
                   </div>
               </div>
           </div> `;    
   });

 });

}

// Construye la hora de un mensaje

 function buscaHora(xfecha){

 // let xfecha = new Date()
  let dHora = xfecha.getHours();
  let dMin  = xfecha.getMinutes();
  let dMinF  = dMin < 10 ? '0' + dMin: dMin;
  let dSeg  = xfecha.getSeconds();
  let dSegF  = dSeg < 10 ? '0' + dSeg: dSeg;
 
  let dia =  xfecha.getDate() +'/'+ ( xfecha.getMonth() +1) +'/' + xfecha.getFullYear() ;

          let dHoraF = dHora > 12 ? dHora - 12 : dHora;        
          let amPm = dHora > 12 ? 'P.M.' : 'A.M.';      
          return(dia +' '+ dHoraF +':'+ dMinF + ' ' +amPm);
        
     
 }

 function borraContacto() {
   var id = localStorage.getItem('idReservado');
  console.log('reservado: '+id);

  db.collection("contactos").doc(id).delete().then(function () {
      alert("Documento eliminado correctamente")
    
      localStorage.removeItem('idReservado');
      $("#eliminar").modal("hide");
      console.log("Document successfully deleted!");
  }).catch(function (error) {
      console.error("Error removing document: ", error);
  });
}

//Guarda en memoria el id de un contacto para luego borrarlo

function  reservaId(id){

  localStorage.setItem('idReservado', id);

  document.getElementById('botonBorrar').onclick ="'borraContacto(id)'";


}

// Borrar Foto

function borrarFoto(){

 //var idCorreo = document.getElementById("idcorreo");
 var ruta = document.getElementById("image").src;
 var storage   = firebase.storage();
 var storageRef = storage.ref();

 var desertRef = storageRef.child(ruta);

 console.log('referencia: '+ desertRef );

 desertRef.delete().then(function() {
   alert('La imagen fue eliminada...')
 }).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(`Error code ${errorCode}`)
  console.log(`Error message ${errorMessage}`)
  //alert('Error al eliminar foto: ')
alert(`Error message ${errorMessage}`)
 }); 

}

