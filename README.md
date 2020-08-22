# Datos del proyecto final
	
	Proyecto Final Chat
	"Smartchat"
	
	Por: Ing. Jerson A. Rodriguez.

	Instituto Tecnológico de Las Américas "ITLA".
	"Diplomado en programación web en Javascript" (2020-T-2) Junio-Agosto del 2020 [DPWJ-T-2-MESCYT-G1].
	Método del curso: Online.
	Profesor/Facilitador:	Lic. Abel Albuez Sánchez.
	
	Auspiciado por y con la colabaración del Ministerio de Educación Superior, Ciencia y Tecnología "MESCYT" del gobierno de la República Dominicana.


# SMARTCHAT

Es un proyecto inspirado en whatsapp, en el que mostramos parte de lo aprendido durante el diplomado.

## rev. 1.0 "21 de agosto de 2020"

## Funcionalidades Generales

* Registro de nuevos usuarios.
* Login.
* Cerrar sesión.
* Información del perfil del usuario.
  
  * Perfil:
    * Subir nueva foto.
    * Cambiar foto.	
    * Eliminar foto.
    * Cambiar nombre de usuarios.
    * Cambiar contraseña.
    
  * Listado de contactos.
    * Agregar contactos.
    * Borrar contactos.
    * Bloquear contactos.
    * Ver lista de contactos.
    
  * Enviar y recibir mensajes de texto.
    * Visualización.
    * Eliminación.
    * Enviar y recibir Imagenes
    * Borrar conversaciones

  * Busqueda de otros perfiles.


## Herramientas utilizadas

* [Firebase Authentication](https://firebase.google.com/docs/auth).

* [Firebase Database](https://firebase.google.com/docs/database).

* [Firebase Cloud Storage](https://firebase.google.com/docs/storage).

* [Bootstrap CSS] (https://getbootstrap.com/).

* [UPKG Global Content Delivery] (https://unpkg.com/).

* [JQuery CSS3, Rich Content] (https://jquery.com/).

* [JAVAScript] (https://nodejs.org).

* [Visual Studio Code] (https://code.visualstudio.com/).

## Pasos para configurar proyecto

* Instalar los siguientes productos:
	- Visual Studio Code (https://code.visualstudio.com/).
	- Node JS [JavaScript] (https://nodejs.org/es/).
	- Live Server for Visual Studio Code [Para pruebas en vivo desde Visual Studio Code].
	- En casos de errores dirigirse a: 

	** Configurar cuenta de la base de datos para el proyecto
		- Crear cuenta de gmail.com (https://gmail.com).
		- Crear proyecto [Base de datos Firebase 17.8 o superior] Nombre: "Smartchat"  (https://firebase.google.com/).
		- Habilitar las opciones de atenticar usuarios de Firebase [Auth via email] (https://console.firebase.google.com/).
		- Crear una base de datos Firebase Storage [asignar a nuestro proyecto para almacenar las imagenes] (https://console.firebase.google.com/).
		- Obtener y actualizar en el archivo de configuración de la base de datos del proyecto [Cambiar datos de Auth de proyecto] (file: \js\init-firebase.js).
		- Descomprimir el proyecto en carpeta destino del computador.
		