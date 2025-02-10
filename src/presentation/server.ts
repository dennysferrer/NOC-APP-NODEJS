import { CronService } from '../presentation/cron/cron.services'

export class Server {
    static start(){
        console.log("Starting server");
        CronService.createJob(
            '*/2 * * * * *',
            () => {
                const date = new Date();
                console.log(`Two seconds ${date}`)
            })
    }
}