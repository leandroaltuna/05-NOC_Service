import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infraestructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
);

const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
);


 //====== Enviar Email With Logs using UseCase ======//
 const emailService = new EmailService();

export class Server {

    public static async start () {

        console.log('Server started....!!');

        //====== Enviar Email ======//
        // const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'leandroaltuna@gmail.com',
        //     subject: 'Logs de Sistema NODE',
        //     htmlBody: `
        //         <h3>Logs de Sistema - NOC</h3>
        //         <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
        //         <p>Ver logs adjuntos</p>
        //     `,
        // });

        //====== Enviar Email With Logs ======//
        // const emailService = new EmailService();
        // emailService.sendEmailWithFileSystemLogs ([
        //     'leandroaltuna@gmail.com', 'accountsweb@hotmail.com'
        // ]);

         //====== Enviar Email With Logs using UseCase ======//
        // new sendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute([
        //     'leandroaltuna@gmail.com', 'accountsweb@hotmail.com'
        // ]);

        //==== Consultar Registro de Logs ===//
        // const logs = await logRepository.getLogs( LogSeverityLevel.medium );
        // console.log( logs );

        //====== Registro de Logs ======//
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         // const date = new Date();
        //         // console.log( '5 second', date );

        //         const url = 'https://www.google.com';
        //         new CheckService(
        //             fsLogRepository,
        //             () => console.log( `${ url } is ok` ),
        //             ( error ) => console.log( error )
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );
        //     }
        // );

        //====== Registro de Logs a Multiple BD ======//
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         // const date = new Date();
        //         // console.log( '5 second', date );

        //         const url = 'https://www.youtube.com';
        //         new CheckServiceMultiple(
        //             [ fsLogRepository, mongoLogRepository, postgresLogRepository ],
        //             () => console.log( `${ url } is ok` ),
        //             ( error ) => console.log( error )
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );
        //     }
        // );

    }

}