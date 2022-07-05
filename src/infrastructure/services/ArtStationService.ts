import { HttpClient } from './../../components/http/httpClient';
import { randomInteger } from '../../components/utils/randomize';

interface ArtStationWork {
    title: string,
    permalink: string,
    cover: {
        small_square_url: string;
    }
}

interface ArtStationResponse {
    data: ArtStationWork[]
}

class ArtStationService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient({
            baseURL: 'https://www.artstation.com',
            responseType: 'json'
        });
    }

    async getRandomWork(): Promise<ArtStationWork> {
        const response = await this.httpClient.get<ArtStationResponse>(
            `/projects.json?page=${randomInteger(0, 2)}&sorting=trending&randomize=true`
            );

        return response.data.data[randomInteger(0, response.data.data.length - 1)];
    }

}

export const artStationService = new ArtStationService();
