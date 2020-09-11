import { HttpClient } from './../../components/http/httpClient';
import { randomInteger } from "../../components/utils/randomize";

class AnekBService {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient({ url: 'https://baneks.ru'});
    }

    public async getRandomAnek(): Promise<string> {
        const response = await this.http.get(`https://baneks.ru/${randomInteger(0, 1000)}`);

        return (response.data as string).split('<p>')[1].split('</p>')[0].replace(/<br \/>/g, '');
    }
}

export const anekService = new AnekBService();