[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/manuasir/ProyectoIV)
[![Build Status](https://travis-ci.org/manuasir/ProyectoIV.svg?branch=master)](https://travis-ci.org/manuasir/ProyectoIV)
[![Inline docs](http://inch-ci.org/github/manuasir/ProyectoIV.svg?branch=master)](http://inch-ci.org/github/manuasir/ProyectoIV)

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

[Documentación del código](https://ivwebcrawler.herokuapp.com/docs/Gruntfile.html)
[Documentación del proyecto](https://github.com/manuasir/ProyectoIV/tree/docs/README.md)

### Contenedores con Docker

Ejecutar la siguiente secuencia de comandos para desplegar localmente la imagen con el proyecto:

- sudo docker pull manuasir/proyectoiv
- sudo docker run -tid manuasir/proyectoiv 

Una vez concluido el despliegue, ya no queda nada ms que hacer por parte del usuario al encontrarse automatizado todo el proceso. Consultar la IP de la imagen con el siguiente comando:

- sudo docker inspect <id-container>

Y acceder mediante el navegador en:

http://ip-contenedor:3000/


### Despliegue en IaaS: AWS

A continuación se va a explicar el proceso mediante el cual este proyecto, o cualquiera alojado en otro repositorio se debe despegar en una plataforma IaaS de la manera más automatizada posible. Ésto es, sin ejecutar ninguna entrada por parte del usuario y únicamente se realicen las tareas mediante scripts.
En primer lugar hay que descargar el kit de herramientas de AWS. Para ello se ha de ejecutar la siguiente orden en el terminal de comandos:

```c
$ sudo apt-get install awscli
```

Seguidamente el usuario ha de autentificarse mediante el servicio que proporciona AWS y poder usar asi la herramienta CLI:

```c
$ aws configure
```

Esta orden requerirá que se introduzcan distintos parámetros de seguridad como son las Key públicas y secretas que proporciona AWS.
Es conveniente almacenar éstas variables de seguridad en variables de entorno del sistema.

Después es el turno de configurar Vagrant. Para ello se generó un Vagrantfile con el siguiente contenido:

```c
Vagrant.configure("2") do |config|
	config.vm.box = "dummy"
	config.vm.provider :aws do |aws, override|
		aws.access_key_id = ENV["AWS_ACCESS_KEY"]
		aws.secret_access_key = ENV["AWS_ACCESS_KEY_SECRET"]
		aws.keypair_name = "ivkeypar"
		aws.security_groups = [ 'vagrant' ]
		aws.ami = "ami-7747d01e"
		override.ssh.username = "ubuntu"
		override.ssh.private_key_path = "/home/manu/Descargas/rsa-APKAJVKAQI6IIO6BCRBQ.pem"
		config.vm.provision "ansible" do |ansible|
			ansible.sudo = true
			ansible.raw_arguments=["-vvv"]
			ansible.playbook = "ansible.yml"
			ansible.verbose= "v"
			ansible.host_key_checking=false
		end
	end
end
```

En él se especifican datos de autentificación en AWS como la ACCESS KEY y la ACCESS KEY SECRET, proporcionadas por AWS.
Como se observa se hace referencia a Ansible, el cual nos va a provisionar la máquina una vez se haya instanciado:

```c
---
- hosts: default
  remote_user: sergio
  sudo: yes
  tasks:
  - name: download sources
    get_url:
      url: https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh
      dest: /home/ubuntu/install.sh
  - name: permisos nvm
    shell: chmod a+x install.sh
  - name: instalar nvm
    shell: /home/ubuntu/install.sh
  - name: instalar node
    shell: /root/.nvm/nvm.sh install 4.6.1
```

En esta secuencia de comandos se clona el repositorio indicado y se trae al servidor para a continuación ejecutar el script que provisiona de las dependencias necesarias. El contenido del script es el siguiente:

```c
#! /bin/bash

if [ -z "$APP_MAIN" ]; then APP_MAIN="bin/www"; fi;

echo NodeJS app\'s start en: $APP_MAIN

#comprueba y cambia la hora. necesario si se exporta en IaaS
if [ -n "$TIME_ZONE" ]
then
  echo $TIME_ZONE | sudo tee /etc/timezone;
  sudo dpkg-reconfigure -f noninteractive tzdata;
fi

#instala versión de node,pone permisos pertinentes, instala librerías
. ~/.nvm/nvm.sh && nvm use 4.6.1; \
  npm install && ./node_modules/bower/bin/bower install --allow-root && grunt && gulp compress; \
  NODE_ENV=production npm start
```

Con todas las configuraciones preparadas, se ejecuta Vagrant para instanciar el proyecto:

- vagrant up --provider=aws
- vagrant provision

```c
Bringing machine 'default' up with 'aws' provider...
==> default: Warning! The AWS provider doesn't support any of the Vagrant
==> default: high-level network configurations (`config.vm.network`). They
==> default: will be silently ignored.
==> default: Launching an instance with the following settings...
==> default:  -- Type: m3.medium
==> default:  -- AMI: ami-7747d01e
==> default:  -- Region: us-east-1
==> default:  -- Keypair: ivkeypar
==> default:  -- Security Groups: ["vagrant"]
==> default:  -- Block Device Mapping: []
==> default:  -- Terminate On Shutdown: false
==> default:  -- Monitoring: false
==> default:  -- EBS optimized: false
==> default:  -- Source Destination check: 
==> default:  -- Assigning a public IP address in a VPC: false
==> default:  -- VPC tenancy specification: default
==> default: Waiting for instance to become "ready"...
==> default: Waiting for SSH to become available...
==> default: Machine is booted and ready for use!
==> default: Rsyncing folder: /home/manu/ => /vagrant
```

Si comprobamos en la plataforma web de AWS se habrá creado la instancia y estará ejecutándose.
![img](http://i1339.photobucket.com/albums/o717/manuasir/c9_zpscni59rfl.png)

Ahora sólo falta conectarnos a ella mediante SSH y el certificado que se ha generado previamente:

![img](http://i1339.photobucket.com/albums/o717/manuasir/c8_zpsgivu2ggg.png)

Adicionalmente se usaron herramientas propias de Javascript para realizar tareas de automatización en el proyecto. Desde el propio 'package.json' se automatizan las tareas relacionadas con la ejecución de la aplicación y la instalación de otras herramientas como [Gulp](https://github.com/manuasir/ProyectoIV/blob/master/Gulpfile.js) y [Grunt](https://github.com/manuasir/ProyectoIV/blob/master/Gruntfile.js).
Con Gulp se realiza automáticamente la inyección de los controladores Javascript y preparlos para producción (minify y uglify). Ésto es concatenar todos los controladores e incluirlos en uno sólo y sustituir las variables proporcionadas por otras de menos tamaño para que su lectura sea más rápida y su interpretación por parte de un humano más difícil. 
Desde Grunt se genera la documentación del proyecto de forma automática. Se genera a partir de los comentarios con la librería docco.

Se puede acceder al proyecto en producción en AWS [aquí](http://ec2-54-88-8-70.compute-1.amazonaws.com:3000/)

