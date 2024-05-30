import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment{

    filename: string;
    path: string;

}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            
            const sentInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });
            
            console.log( sentInformation );

            return true;
        } catch (error) {
            
            return false;
        }

    }

    async sendEmailWithFileSystemLogs( to: string | string[] ){

        const subject = 'Logs de Sistema NODE';
        const htmlBody = `
            <h3>Logs de Sistema - NOC</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log'},
            { filename: 'logs-medium.log', path: './logs/logs-medium.log'},
            { filename: 'logs-high.log', path: './logs/logs-high.log'},
        ];

        return this.sendEmail({ to, subject, htmlBody, attachments });

    }


}