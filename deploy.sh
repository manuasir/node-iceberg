#! /bin/bash

#el usuario es 'node'

#check and set the default app start file
if [ -z "$APP_MAIN" ]; then APP_MAIN="bin/www"; fi;

#check the file to be started in the container's logs
echo NodeJS app\'s start file is: $APP_MAIN

#comprueba y cambia la hora. necesario si se exporta en IaaS
if [ -n "$TIME_ZONE" ]
then
  echo $TIME_ZONE | sudo tee /etc/timezone;
  sudo dpkg-reconfigure -f noninteractive tzdata;
fi

#instala versión de node,pone permisos pertinentes, instala librerías
. ~/.nvm/nvm.sh && nvm use default; \
  npm update -g bower pm2; \
  cd /ProyectoIV && npm update && npm install && npm install -g grunt && npm install -g gulp && gulp compress && grunt && bower install; \
  NODE_ENV=production pm2 start $APP_MAIN -i 0