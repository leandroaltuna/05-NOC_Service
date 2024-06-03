import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";



describe( 'log.respository.impl.ts', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepositoryImpl = new LogRepositoryImpl( mockLogDatasource );

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test( 'saveLog should call the datasource with arguments', async() => {

        const log = { level: LogSeverityLevel.medium, message: 'test-message' } as LogEntity;
        await logRepositoryImpl.saveLog( log );

        expect( mockLogDatasource.saveLog ).toHaveBeenCalledWith( log );

    });

    test( 'getLogs should call the datasource with arguments', async() => {

        const lowSeverity = LogSeverityLevel.low;

        await logRepositoryImpl.getLogs( lowSeverity );

        expect( mockLogDatasource.getLogs ).toHaveBeenCalledWith( lowSeverity );

    });

});