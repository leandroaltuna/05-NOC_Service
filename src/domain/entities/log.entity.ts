
export enum LogSeverityLevel {

    low     = 'low',
    medium  = 'medium',
    high    = 'high',

}


export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {

        this.message = message;
        this.level = level;
        this.createdAt = new Date();

    }

    // { "level": "high", "message": "Hola Mundo", "createdAt": "63278372TZ37373" }
    static fromJson = ( json: string ): LogEntity => {

        const { level, message, createdAt } = JSON.parse( json );

        const log = new LogEntity( message, level );
        log.createdAt = new Date( createdAt );

        return log;

    }

}