
export enum LogSeverityLevel {

    low     = 'low',
    medium  = 'medium',
    high    = 'high',

}

export interface LogEntityOptions {

    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;

}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public origin: string;
    public createdAt: Date;

    constructor( options: LogEntityOptions ) {

        const { message, level, origin, createdAt = new Date() } = options;

        this.origin = origin;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;

    }

    // { "level": "high", "message": "Hola Mundo", "createdAt": "63278372TZ37373" }
    static fromJson = ( json: string ): LogEntity => {

        const { level, message, origin, createdAt } = JSON.parse( json );

        const log = new LogEntity({
            message: message, 
            level: level,
            origin: origin,
            createdAt: createdAt
        });
        // log.createdAt = new Date( createdAt );

        return log;

    }

}