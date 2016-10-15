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


##Uso:

>'## Es necesario tener el servicio mongod activo
> $ node /app/server.js
> '##Comienza a recibir peticiones a través de http://localhost:3000