FROM ubuntu:14.04
MAINTAINER Manuel Jiménez Bernal <manuasir@correo.ugr.es>

# instalar paquetes
RUN apt-get update && apt-get install -y curl git build-essential
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app/
RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

RUN git clone https://github.com/manuasir/NodeJS-WebCrawler.git
WORKDIR /usr/src/app/ProyectoIV/
#versión de Node
ENV NODE_VERSION 6.11.0

#necesario para nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvma instalación de NVM
ENV NVM_DIR /root/.nvm

#clonar repositorio

#instalar la versión de node y seleccionar como predeterminada. también se instalan paquetes globales (-g)
RUN . ~/.nvm/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && npm install -g bower pm2 gulp grunt
# Añadir script que automatiza el despliegue
ADD ./deploy.sh /deploy.sh

#abre el puerto 3000
EXPOSE 3000

#arranca el script que lo hace casi todo
CMD ["/bin/bash", "/deploy.sh"]
