FROM ubuntu:14.04
MAINTAINER Manuel Jiménez Bernal <manuasir@correo.ugr.es>

#instalar git
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y git
RUN apt-get install -y curl

# NVM y Node version
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
RUN curl nvm install 4.6.1

#clonar repositorio
RUN sudo git clone https://github.com/manuasir/ProyectoIV

# Herramientras
RUN npm install
RUN npm install -g bower
RUN npm install -g grunt
RUN npm install -g gulp
RUN gulp compress
RUN grunt
RUN npm start