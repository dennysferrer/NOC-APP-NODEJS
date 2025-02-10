import { CronService } from '../presentation/cron/cron.services'
import { CheckService } from '../domain/use-cases/checks/check-service'

export class Server {
    static start(){
        console.log("Starting server");
        CronService.createJob(
            '*/2 * * * * *',
            () => {
                new CheckService().execute('https://www.google.com')

            })
    }
}