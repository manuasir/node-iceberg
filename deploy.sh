#! /bin/bash

if [ -z "$APP_MAIN" ]; then APP_MAIN="bin/www"; fi;

echo NodeJS app\'s start en: $APP_MAIN

#comprueba y cambia la hora. necesario si se exporta en IaaS
if [ -n "$TIME_ZONE" ]
then
  echo $TIME_ZONE | sudo tee /etc/timezone;
  sudo dpkg-reconfigure -f noninteractive tzdata;
fi

#instala dependencias,pone permisos pertinentes, instala librerías
npm install && ./node_modules/bower/bin/bower install --allow-root && grunt && gulp compress; \
NODE_ENV=production npm start
