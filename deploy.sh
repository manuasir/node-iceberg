#! /bin/bash

#---------------------------------------------------#
if [ -z "$APP_MAIN" ]; then APP_MAIN="bin/www"; fi;
echo NodeJS app\'s start en: $APP_MAIN

#---------------------------------------------------#
#comprueba y cambia la hora. necesario si se exporta en IaaS
if [ -n "$TIME_ZONE" ]
then
  echo $TIME_ZONE | sudo tee /etc/timezone;
  sudo dpkg-reconfigure -f noninteractive tzdata;
fi

#---------------------------------------------------#
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
nvm install 6.11.0

#---------------------------------------------------#
#instala dependencias,pone permisos pertinentes, instala librerías
npm install -g npm && npm install && npm install -g pm2 && ./node_modules/bower/bin/bower install --allow-root; \
NODE_ENV=production npm start
#---------------------------------------------------#
