import { LogEntity } from "../../entities/log.entity";

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

type SuccessCallback = (() => void) | undefined
type ErrorCallback = ((error: string) => void) | undefined

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback,
    ) {}

    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok){
                //throw new Error(`Error on fetch request: ${url}`);
                if (this.errorCallback){
                    this.errorCallback(`Error on fetch request: ${url}`)
                }
            }
            if (this.successCallback){
                this.successCallback()
            }
            
            return true;
        } catch (error){
            if (this.errorCallback){
                this.errorCallback(`${error}`)
            }
            return false;
        }
    }
}








