import { CheckService } from "../domain/use-cases/checks/check-service";
import { sendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
);

 //====== Enviar Email With Logs using UseCase ======//
 const emailService = new EmailService();

export class Server {

    public static start () {

        console.log('Server started....');

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

        //====== Registro de Logs ======//
        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         // const date = new Date();
        //         // console.log( '5 second', date );

        //         const url = 'https://www.google.com';
        //         new CheckService(
        //             fileSystemLogRepository,
        //             () => console.log( `${ url } is ok` ),
        //             ( error ) => console.log( error )
        //         ).execute( url );
        //         // new CheckService().execute( 'http://localhost:3000' );


        //     }
        // );

    }

}