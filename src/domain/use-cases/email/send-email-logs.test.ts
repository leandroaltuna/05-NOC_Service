import { LogEntity } from "../../entities/log.entity";
import { sendEmailLogs } from "./send-email-logs";



describe( 'send-email-logs.ts', () => {

    const emailMockService = {
        // sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue( true ),//mock el valor de retorno de la funcion.
    }

    const logMockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    // Usamos "as any" para no implementar al detalle el mock del emailService
    const newSendEmailLogs = new sendEmailLogs( emailMockService as any, logMockRepository );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test( 'should call sendEmail and saveLog', async() => {

        const wasSent = await newSendEmailLogs.execute( 'kuraqchuri@gmail.com' );

        expect( wasSent ).toBe( true );
        expect( emailMockService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( logMockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( logMockRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any( Date ),
            level: "low",
            message: "Email log sent",
            origin: "send-email-logs.ts",
        });
        
    });

    test( 'should log in case of error', async() => {

        emailMockService.sendEmailWithFileSystemLogs.mockReturnValue( false );

        const wasSent = await newSendEmailLogs.execute( 'kuraqchuri@gmail.com' );

        expect( wasSent ).toBe( false );
        expect( emailMockService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( logMockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( logMockRepository.saveLog ).toHaveBeenCalledWith({
            createdAt: expect.any( Date ),
            level: "high",
            message: "Email not sent: Error: Email log not sent!",
            origin: "send-email-logs.ts",
        });

    });

});