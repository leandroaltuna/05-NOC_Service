import { log } from "console";
import { logModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {
       
        const newLog = await logModel.create( log );
        // await newLog.save(); // es opcional ya que con el create es suficiente.
        console.log( 'Mongo Log created: ' + newLog.id );

    }

    async getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
       
        const logs = await logModel.find({
            level: severitylevel,
        });

        // return logs.map( mongoLog => LogEntity.fromObject( mongoLog ) );
        return logs.map( LogEntity.fromObject ); //-- version corta
    }

}