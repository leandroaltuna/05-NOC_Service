import { LogEntity, LogSeverityLevel } from "./log.entity";


describe( 'log.entity.ts', () => {
    
    const dataObj = {
        origin: 'log.entity.ts',
        message: 'Hola Mundo',
        level: LogSeverityLevel.medium,
    }

    test( 'should create a LogEntity instance', () => {

        const log = new LogEntity( dataObj );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createdAt ).toBeInstanceOf( Date );

    });
    
    test( 'should create a LogEntity instance from json', () => {

        const json = `{"origin":"check-service.ts","message":"Service https://www.youtube.com working","level":"low","createdAt":"2024-05-31T17:11:55.153Z"}`;

        const log = LogEntity.fromJson( json );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.origin ).toBe( "check-service.ts" );
        expect( log.message ).toBe( "Service https://www.youtube.com working" );
        expect( log.level ).toBe( LogSeverityLevel.low );
        expect( log.createdAt ).toBeInstanceOf( Date );

    });

    test( 'should create a LogEntity instance from object', () => {

        const log = LogEntity.fromObject( dataObj );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createdAt ).toBeInstanceOf( Date );

    });

});