test:
	mocha test/test.js
deployment:
  production:
    branch: master
    commands:
      - npm install -g grunt
      - npm install -g gulp
      - grunt
      - gulp compress