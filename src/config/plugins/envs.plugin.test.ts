import { envs } from "./envs.plugin"


describe( 'envs.plugin.ts', () => {

    test( 'should return env options', () => {

        expect( envs ).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'kuraqchuri@gmail.com',
            MAILER_SECRET_KEY: 'jyzcswkabvobtymp',
            PROD: true,
            MONGO_URL: 'mongodb://chezna:123456789@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'chezna',
            MONGO_PASS: '123456789'
          });

    });

    // Validar que el PORT sea un numero
    test( 'should return error if not found', async() => {

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            
            await import('./envs.plugin');
            expect( true ).toBe( false );

        } catch (error) {
            expect( `${ error }` ).toContain( '"PORT" should be a valid integer' );
        }

    });

})