FROM ubuntu:14.04
MAINTAINER Manuel Jiménez Bernal <manuasir@correo.ugr.es>

#usar mirrors para que sea más rápido. independientemente la localizacón
RUN echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty main restricted universe multiverse" > /etc/apt/sources.list; \
	echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty-updates main restricted universe multiverse" >> /etc/apt/sources.list; \
	echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty-backports main restricted universe multiverse" >> /etc/apt/sources.list; \
	echo "deb mirror://mirrors.ubuntu.com/mirrors.txt trusty-security main restricted universe multiverse" >> /etc/apt/sources.list

# instalar paquetes
RUN apt-get update && apt-get install -y curl git build-essential

#añadir un usuario sólo para estos menesteres
RUN useradd --home /home/node -m -U -s /bin/bash node

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash

#versión de Node
ENV NODE_VERSION 6.9.1

#necesario para la instalación de NVM
ENV NVM_DIR /root/.nvm

#clonar repositorio
RUN git clone https://github.com/manuasir/ProyectoIV.git

#instalar la versión de node y seleccionar como predeterminada. también se instalan paquetes globales (-g)
RUN . ~/.nvm/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && npm install -g bower pm2

# Añadir script que automatiza el despliegue
ADD ./deploy.sh /deploy.sh

#abre el puerto 3000
EXPOSE 3000

#arranca el script que lo hace casi todo
CMD ["/bin/bash", "/deploy.sh"]