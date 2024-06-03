import nodemailer from 'nodemailer';
import { EmailService, SendMailOptions } from './email.service';


describe( 'email.service.ts', () => {

    const mockSendEmail =  jest.fn();

    //Mock al createTransport
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendEmail
    });

    const emailService = new EmailService();

    afterAll(() => {
        jest.clearAllMocks();
    });

    test( 'should send an email', async() => {

        const options: SendMailOptions = {
            to: 'kuraqchuri@google.com',
            subject: 'Test',
            htmlBody: '<h1>Test,</h1>',
        };

        await emailService.sendEmail( options );

        expect( mockSendEmail ).toHaveBeenCalledWith({
            attachments: expect.any( Array ),
            html: "<h1>Test,</h1>",
            subject: "Test",
            to: "kuraqchuri@google.com",
        });

    });

    test( 'should send email with attachments', async() => {

        const testEmail = 'kuraqchuri@google.com'
        await emailService.sendEmailWithFileSystemLogs( testEmail );

        expect( mockSendEmail ).toHaveBeenCalledWith({
            to: testEmail,
            subject: "Logs de Sistema NODE",
            html: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log'},
                { filename: 'logs-medium.log', path: './logs/logs-medium.log'},
                { filename: 'logs-high.log', path: './logs/logs-high.log'},
            ])
        });

    });

});