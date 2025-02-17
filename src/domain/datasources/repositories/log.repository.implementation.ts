import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRespository } from "../../respository/log.respository";
import { LogDataSource } from "../log.datasource";


export class LogRepositoryImpl implements LogRespository {

    constructor(
        private readonly logDataSource: LogDataSource
    ){}

    async saveLog(log: LogEntity): Promise<void> {
        this.logDataSource.saveLog(log)
    }
    async getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLog(severityLevel)
    }
    
}   