import { JsonController, Post, Body, Get } from "routing-controllers";

@JsonController('/api')
export class Controller {
    @Get('/')
    public async test(): Promise<number> {
        return 0;
    }
}