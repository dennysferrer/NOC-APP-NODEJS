interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>
}

export class CheckService implements CheckServiceUseCase {
    async execute(url: string): Promise<boolean> {
        try {
            const req = await fetch(url);
            if (!req.ok){
                throw new Error(`Error on fetch request: ${url}`);
            }
            console.log(`${url} is Ok...`)
            return true;
        } catch (error){
            console.log(`${error}`);
            return false;
        }
    }
}