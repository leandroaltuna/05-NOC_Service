#Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

#dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
`````
PORT=3000

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=false
`````
3. Instalar y configurar Nodemon ``npm install``
4. Instalar CRON (si no lo tuviera)
5. Paquetes para variables de entorno en versiones de Node menores a v20
````
dotenv
env-var
````
6. Ejecutar ``npm run dev`` 