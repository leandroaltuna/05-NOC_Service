import { PrismaClient } from "@prisma/client";
import { PostgresLogDatasource } from "./postgres-log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


describe( 'postgres-log.datasource.ts', () => {

    const postgresLogDatasource = new PostgresLogDatasource();
    
    const log = new LogEntity({
        origin: 'mongo-log.datasource.test.ts',
        message: 'test-message-2',
        level: LogSeverityLevel.medium,
    });

    // const testPrisma = new PrismaClient();

    // afterEach( async() => {
    //     await testPrisma.logModel.deleteMany();
    // })

    // beforeAll(() => {
    // })

    // afterAll(() => {
    //     testPrisma.$disconnect();
    // })


    test( 'should create a new log', async() => {

        // await postgresLogDatasource.saveLog( log );
        

    });

});