import { CronService } from '../presentation/cron/cron.services'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { LogRepositoryImpl } from '../domain/datasources/repositories/log.repository.implementation';
import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogEntity } from '../domain/entities/log.entity';

const fileSystemLogRespository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

export class Server {
    static start(){
        console.log("Starting server");
        CronService.createJob(
            '*/2 * * * * *',
            () => {
                const url = 'https://www.localhost:3000.com';
                new CheckService(
                    () => {
                        console.log(`${url} is ok`)
                        fileSystemLogRespository.saveLog(new LogEntity(`${url} is ok`, 'low'))
                    },
                    (error) => {
                        console.log(error)
                        fileSystemLogRespository.saveLog(new LogEntity(error, 'high'))
                    }
                ).execute(url);

            })
    }
}