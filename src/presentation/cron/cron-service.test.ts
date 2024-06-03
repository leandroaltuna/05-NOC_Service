import { CronService } from "./cron-service";


describe( 'Cron-Service.ts', () => {

    const mockOnTick = jest.fn();

    test( 'should create a job', (done) => {

        const job = CronService.createJob( '* * * * * *', mockOnTick );

        setTimeout(() => {
            
            expect( mockOnTick ).toHaveBeenCalledTimes(2);
            job.stop();
            done();
        }, 2000);

    });

});