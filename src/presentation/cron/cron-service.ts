import { CronJob } from 'cron';

type CronTime = string | Date;
type OnTick = () => void;


export class CronService {

    public static createJob( cronTime: CronTime, onTick:OnTick ): CronJob {

        // const job = new CronJob(

        //     '*/3 * * * * *', // se remplaza por cronTime
        //     () => {
            
        //         const date = new Date();
        //         console.log( '3 second', date );

        //     }, // se reemplaza por onTick que es un callback

        // );

        const job = new CronJob( cronTime, onTick );

        job.start();

        return job;

    }

}