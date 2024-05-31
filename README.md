#Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript

# Dev
1. Clonar el archivo .env.template a .env
2. Configurar las variables de entorno
3. Instalar y configurar Nodemon ``npm install``
4. Levantar las base de datos (Mongodb y Postgres en docker desk) con el comando
    ```
    docker compose up -d
    ```
5. Instalar CRON (si no lo tuviera)
6. Paquetes para variables de entorno en versiones de Node menores a v20
    ````
    dotenv
    env-var
    ````
6. Ejecutar ``npm run dev`` 

## Obterner Gmail Key
[Google AppPaswords](https://myaccount.google.com/u/0/apppasswords)
