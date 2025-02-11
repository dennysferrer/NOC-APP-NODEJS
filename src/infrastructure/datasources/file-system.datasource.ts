import fs from 'node:fs'
import {LogDataSource} from "../../domain/datasources/log.datasource";
import {LogEntity, LogSeverityLevel} from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource{

    private readonly logPath = 'logs/'
    private readonly allLogsPath = 'logs/logs-all.log'
    private readonly mediumLogsPath = 'logs/logs-medium.log'
    private readonly highLogsPath = 'logs/logs-high.log'

    constructor(){
        this.createLogsFiles()
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)){
            fs.mkdirSync(this.logPath);
        }
        [
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach(path => {
            if (fs.existsSync(path)){
                return
            }
            fs.writeFileSync(path,'')
        })
    }

    async saveLog(newlog: LogEntity): Promise<void> {
        const logJson = `${JSON.stringify(newlog)}\n`
        fs.appendFileSync(this.allLogsPath, logJson )
        if (newlog.level === 'low') return;
        if (newlog.level === 'medium') {
            fs.appendFileSync(this.mediumLogsPath, logJson )
        } else {
            fs.appendFileSync(this.highLogsPath, logJson )
        }
    }

    getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return Promise.resolve([]);
    }

}