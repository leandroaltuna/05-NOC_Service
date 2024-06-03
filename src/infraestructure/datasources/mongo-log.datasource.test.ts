import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDatabase, logModel } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoLogDatasource } from "./mongo-log.datasource";


describe( 'mongo-log.datasource.ts', () => {
    
    const mongoLogDatasource = new MongoLogDatasource();
    
    const log = new LogEntity({
        origin: 'mongo-log.datasource.test.ts',
        message: 'test-message-2',
        level: LogSeverityLevel.medium,
    });

    beforeAll( async() => {

        await MongoDatabase.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });

    });

    afterEach( async() => {
        await logModel.deleteMany();
    });

    afterAll( async() => {        
        mongoose.connection.close();
    });

    test( 'should create a new log', async() => {

        const logSpy = jest.spyOn( console, 'log' );

        await mongoLogDatasource.saveLog( log );

        expect( logSpy ).toHaveBeenCalled();
        expect( logSpy ).toHaveBeenCalledWith( "Mongo Log created: ", expect.any( String ) );

    });

    test( 'should get logs', async() => {

        await mongoLogDatasource.saveLog( log );
        await mongoLogDatasource.saveLog( log );

        const logs = await mongoLogDatasource.getLogs( LogSeverityLevel.medium );

        expect( logs.length ).toBe(2);
        expect( logs[0].level ).toBe( LogSeverityLevel.medium );

    });
    

});