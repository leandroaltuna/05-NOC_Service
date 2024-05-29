import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';


(async () => {
    main();
})();

function main() {
    
    Server.start();
    
    // console.log( envs.MAILER_EMAIL, envs.MAILER_SECRET_KEY );

}