import fs from "fs";
import path from "path";
import { FileSystemDatasource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



describe( 'file-system.datasource.test.ts', () => {

    const logPath = path.join( __dirname, '../../../logs' );

    beforeEach(() => {
        fs.rmSync( logPath, { recursive: true, force: true } );
    });

    test( 'should create log files if they do not exists', () => {

        new FileSystemDatasource();
        const files = fs.readdirSync( logPath );
        
        expect( files ).toEqual( [ 'logs-all.log', 'logs-high.log', 'logs-medium.log' ] );
        
    });

    test( 'should save a log in logs-all.log', () => {

        const fileSystemLogDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.low,
        });

        fileSystemLogDatasource.saveLog( log );

        const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, 'utf-8' );
        
        expect( allLogs ).toContain( JSON.stringify( log ) );

    });

    test( 'should save a log in logs-all.log and logs-medium.log', () => {

        const fileSystemLogDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.medium,
        });

        fileSystemLogDatasource.saveLog( log );

        const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, 'utf-8' );
        const mediumLogs = fs.readFileSync( `${ logPath }/logs-medium.log`, 'utf-8' );
        
        expect( allLogs ).toContain( JSON.stringify( log ) );
        expect( mediumLogs ).toContain( JSON.stringify( log ) );

    });

    test( 'should save a log in logs-all.log and logs-high.log', () => {

        const fileSystemLogDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message',
            level: LogSeverityLevel.high,
        });

        fileSystemLogDatasource.saveLog( log );

        const allLogs = fs.readFileSync( `${ logPath }/logs-all.log`, 'utf-8' );
        const highLogs = fs.readFileSync( `${ logPath }/logs-high.log`, 'utf-8' );
        
        expect( allLogs ).toContain( JSON.stringify( log ) );
        expect( highLogs ).toContain( JSON.stringify( log ) );

    });

    test( 'should return all logs', async() => {

        const fileSystemLogDatasource = new FileSystemDatasource();

        const logLow = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message-LOW',
            level: LogSeverityLevel.low,
        });
        const logMedium = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message-MEDIUM',
            level: LogSeverityLevel.medium,
        });
        const logHigh = new LogEntity({
            origin: 'file-system.datasource.test.ts',
            message: 'test-message-HIGH',
            level: LogSeverityLevel.high,
        });

        await fileSystemLogDatasource.saveLog( logLow );
        await fileSystemLogDatasource.saveLog( logMedium );
        await fileSystemLogDatasource.saveLog( logHigh );

        const lowLogs = await fileSystemLogDatasource.getLogs( LogSeverityLevel.low );
        const mediumLogs = await fileSystemLogDatasource.getLogs( LogSeverityLevel.medium );
        const highLogs = await fileSystemLogDatasource.getLogs( LogSeverityLevel.high );

        expect( lowLogs ).toEqual( expect.arrayContaining([ logLow, logMedium, logHigh ]) );
        expect( mediumLogs ).toEqual( expect.arrayContaining([ logMedium ]) );
        expect( highLogs ).toEqual( expect.arrayContaining([ logHigh ]) );

    });

    test( 'should throw an error if severity level is not defined', async() => {

        const fileSystemLogDatasource = new FileSystemDatasource();
        const customLogSeverityLevel = 'SUPER_MEGA_HIGH' as LogSeverityLevel;
        
        try {
            await fileSystemLogDatasource.getLogs( customLogSeverityLevel );
            expect( true ).toBeFalsy();
        } catch (error) {
            const errorString = `${ error }`;
            expect(errorString ).toContain( `${ customLogSeverityLevel } not implemented` );
        }

    });

});