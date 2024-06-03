import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";


describe( 'check-service-multiple.ts', () => {

    //==== Modo 1 ===//
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const fsMockLogRepository = mockRepository;
    const mongoMockLogRepository = mockRepository;
    const postgresMockLockRepository = mockRepository;

    //=== Modo 2 ===//
    const mockRepositories = [
        {
            saveLog: jest.fn(),
            getLogs: jest.fn(),
        },
        {
            saveLog: jest.fn(),
            getLogs: jest.fn(),
        },
        {
            saveLog: jest.fn(),
            getLogs: jest.fn(),
        }
    ]

    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test( 'should call successCallback when fetch returns true', async() => {

        const checkServiceMultiple = new CheckServiceMultiple(
            [fsMockLogRepository, mongoMockLogRepository, postgresMockLockRepository],
            successCallback,
            errorCallback,
        );

        const wasOk = await checkServiceMultiple.execute( 'https://www.youtube.com' );
        
        expect( wasOk ).toBe( true );
        expect( successCallback ).toHaveBeenCalled();
        expect( errorCallback ).not.toHaveBeenCalled();

        expect( fsMockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( mongoMockLogRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );
        expect( postgresMockLockRepository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) );

    });

    test( 'should call errorCallback when fetch returns false', async() => {

        const checkServiceMultiple = new CheckServiceMultiple(
            mockRepositories,
            successCallback,
            errorCallback,
        );

        const wasOk = await checkServiceMultiple.execute( 'https://jhabdasdyoutube.com' );
        
        expect( wasOk ).toBe( false );
        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).toHaveBeenCalled();

        mockRepositories.forEach( 
            repository => expect( repository.saveLog ).toHaveBeenCalledWith( expect.any( LogEntity ) ) 
        );

    });

});