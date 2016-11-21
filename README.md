[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/manuasir/ProyectoIV)
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

##Despliegue en Heroku

Desde el botón insertado al inicio de README.md puede automatizarse el despliegue en el PaaS Heroku. Se puede acceder al proyecto en producción [aquí](https://ivwebcrawler.herokuapp.com/).