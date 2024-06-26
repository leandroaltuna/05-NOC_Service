import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { MongoDatabase, logModel } from "./data/mongo";
import { PrismaClient } from "@prisma/client";


(async () => {
    main();
})();

// Se volvio una funcion async para poder mandar a esperar la conexcion de mongo y que este conectado antes de empezar el Server.start().
async function main() {

    //==== Mongo ====//
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    //Crear una coleecion = tables, documento = registro or row.
    // const newLog = await new logModel({
    //     message: 'Test message from Mongo 4',
    //     origin: 'App.ts',
    //     level: 'low',
    // }); 
    // await newLog.save();
    // console.log( newLog );

    // const logs = await logModel.find();
    // console.log( logs );
    //===================//


    //===== Postgres / Prisma =====//
    // const prisma = new PrismaClient();
    // const newLog = await prisma.logModel.create({
    //     data: {
    //         message: 'Test de Prueba',
    //         level: 'LOW',
    //         origin: 'App.ts',
    //     }
    // });
    // const logs = await prisma.logModel.findMany({
    //     where: {
    //         level: 'LOW'
    //     }
    // });
    // console.log({ logs });
    
    Server.start();
    
    // console.log( envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY );

}