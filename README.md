[![Build Status](https://travis-ci.org/manuasir/ProyectoIV.svg?branch=master)](https://travis-ci.org/manuasir/ProyectoIV)

# ProyectoIV
Proyecto para la asignatura Infraestructura Virtual de la Universidad de Granada 

##Web-Crawler

Extrae y organiza hipervínculos por niveles a partir de una URL de origen resultando en una estructura de árbol almacenada en una base de datos MongoDB, presentándose en una interfaz web o mediante peticiones REST. Este proyecto utiliza el stack de Javascript MEAN: (MongoDB + Express + AngularJS + NodeJS).

[Artículo wikipedia aquí](https://en.wikipedia.org/wiki/Web_crawler)

##Planteamiento

Se trata construir una estructura de datos de tipo árbol en la que se van a organizar las URL extraídas.
El backend corriendo bajo Node.JS se encarga de gestionar este almacenamiento construyendo objetos JSON que respeten la estructura de árbol inicial, y la almacene en una base de datos documental MongoDB.
También se gestionan las peticiones mediante la implementación de una REST API sobre Express, el cual proporcionará los datos al cliente AngularJS, que muestra la información en la interfaz web.

Se debe elegir el nivel de profundidad hasta el cual se va a explorar el árbol, aumentando exponencialmente los recursos requeridos para ejecutar la aplicación.


##Uso e Integración Continua con Travis-CI:

> ## Es necesario tener el servicio mongod activo
> $ node /app/server.js
> ##Comienza a recibir peticiones a través de http://localhost:3000

Se utilizó Travis-CI para la Integración Continua al ofrecer ventajas tales como trabajar con repositorios privados al ser beneficiario de GitHub Students.

##Despliegue en Heroku

Como servicio PaaS se eligió Heroku al contar previamente con una cuenta en la plataforma. Las gestiones se realizaron desde el dashboard que ofrece el servicio, facilitando el proceso.
En primer lugar se creó la nueva aplicación vacía bajo el stack de Node.JS, siendo linkada con el repositorio en GitHub donde se encuentra el código y los scripts necesarios para automatizar el proceso de despliegue. Como lo que se pretende es que se haga el deploy una vez se pasen los tests, hay que activar la opción pertinente en el panel de administración. Para ello Heroku detecta automáticamente el servicio Travis-CI de integración continua que realiza los tests de la aplicación. En el caso de que los tests fallen, la aplicación no se desplegará.
Se ha de elegir la rama que se pretende que se despliegue al realizar push, en este caso la rama 'master'. Una vez realizados éstos pasos se procede a lanzar el deploy desde el push a nuestro repositorio. Se ha de generar automáticamente un fichero app.json en el raíz del proyecto con información sobre el esquema de la aplicación.
Una vez realizado el deploy con éxito, lanzamos la aplicación desde el navegador en la URL correspondiente. Es en este momento cuando aparecen los errores en tiempo de ejecución, para este caso relacionados con las conexiones a la base de datos MongoDB, que seguían intentando conectar en 'localhost'.
La solución es instalar los plugins necesarios que resuelvan estas dependencias. En este proyecto se instaló el plugin de MongoLAB, el cual cuenta con un sandbox de prueba gratuita para crear y administrar nuestros documentos y colecciones. Cambiamos en la aplicación las conexiones para que apunten al nuevo servidor de MongoDB y el problema quedó resuelto. 
Paralelamente es necesario instalar las dependencias necesarias post-deploy. En este proyecto se utilizó el gestor de dependencias para front-end 'bower', por lo que desde el fichero package.json en el campo 'scripts' se hubo que asegurar que se realizaba la instalación de las dependencias bower necesarias como AngularJS, Bootstrap y otras librerías.

Se puede acceder al proyecto en producción [aquí](https://ivwebcrawler.herokuapp.com/).