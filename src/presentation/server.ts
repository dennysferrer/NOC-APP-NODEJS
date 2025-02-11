import { CronService } from '../presentation/cron/cron.services'
import { CheckService } from '../domain/use-cases/checks/check-service'

export class Server {
    static start(){
        console.log("Starting server");
        CronService.createJob(
            '*/2 * * * * *',
            () => {
                const url = 'http://localhost:3000/comments';
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.log(`fetching in ${url} failed`)
                ).execute(url);

            })
    }
}