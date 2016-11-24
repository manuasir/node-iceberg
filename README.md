[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/manuasir/ProyectoIV)
[![Build Status](https://travis-ci.org/manuasir/ProyectoIV.svg?branch=master)](https://travis-ci.org/manuasir/ProyectoIV)

# ProyectoIV
Proyecto para la asignatura Infraestructura Virtual de la Universidad de Granada 

### Web-Crawler

Extrae y organiza hipervínculos por niveles a partir de una URL de origen resultando en una estructura de árbol almacenada en una base de datos MongoDB, presentándose en una interfaz web o mediante peticiones REST. Este proyecto utiliza el stack de Javascript MEAN: (MongoDB + Express + AngularJS + NodeJS).

[Artículo wikipedia aquí](https://en.wikipedia.org/wiki/Web_crawler)

### Planteamiento

Se trata construir una estructura de datos de tipo árbol en la que se van a organizar las URL extraídas.
El backend corriendo bajo Node.JS se encarga de gestionar este almacenamiento construyendo objetos JSON que respeten la estructura de árbol inicial, y la almacene en una base de datos documental MongoDB.
También se gestionan las peticiones mediante la implementación de una REST API sobre Express, el cual proporcionará los datos al cliente AngularJS, que muestra la información en la interfaz web.

### Despliegue en Heroku

Heroku genera automáticamente un fichero [app.json](https://github.com/manuasir/ProyectoIV/blob/master/app.json) en el raíz del proyecto con información sobre el esquema de la aplicación. 
Mediante el fichero [package.json](https://github.com/manuasir/ProyectoIV/blob/master/package.json) heroku va a automatizar el proceso de despliegue,también es necesario indicar de alguna manera cómo instalar las dependencias necesarias post-deploy.
```c
...
"scripts": {
    "test": "mocha",
    "start": "node app/server.js",
    "postinstall": "./node_modules/bower/bin/bower install"
  },
  ...
```
En este proyecto se utilizó el gestor de dependencias para front-end 'bower', por lo que desde el fichero [package.json](https://github.com/manuasir/ProyectoIV/blob/master/package.json) en el campo 'scripts' se hubo que asegurar que se realizaba la instalación de las dependencias bower necesarias como AngularJS, Bootstrap y otras librerías.
Para automatizar la instalación de dependencias en front-end se utilizó un fichero [bower.json](https://github.com/manuasir/ProyectoIV/blob/master/bower.json)
```c
{
  "name": "mean-crawler",
  "description": "",
  "main": "app/server.js",
  "authors": [
    "Manuel J. Bernal <manu.asi2@gmail.com>"
  ],
  "license": "ISC",
  "homepage": "https://github.com/manuasir/ProyectoIV",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "angular": "angularjs#^1.5.8",
    "json-formatter": "^0.6.0",
    "bootstrap": "^3.3.7"
  }
}
```
Desde el botón insertado al inicio de README.md puede ejecutarse el despliegue en el PaaS Heroku.
Se puede acceder al proyecto en producción [aquí](https://ivwebcrawler.herokuapp.com/).
