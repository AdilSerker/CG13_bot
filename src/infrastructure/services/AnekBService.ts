import { HttpClient } from './../../components/http/httpClient';
import { randomInteger } from "../../components/utils/randomize";
import { anekBRepository } from '../../infrastructure/repositories/AnekBRepository';

class AnekBService {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient({ url: 'https://baneks.ru'});
    }

    public async getRandomAnek(): Promise<string> {
        const aneks = await anekBRepository.getList();

        const showedAneks = aneks.map(item => item.anek_id);

        let newAnekIds = [];
        for (let i = 0; i < 1142; ++i) {
            if (!showedAneks.includes(i + 1)) {
                newAnekIds.push(i + 1);
            }
        }

        let responseText = 'А все, а пиздец. Запас анеков исчерпан! нужен новый ресурс (яма с говном)';

        if (newAnekIds.length) {
            const randomAnekId = newAnekIds[randomInteger(0, newAnekIds.length - 1)];

            const response = await this.http.get(`https://baneks.ru/${randomAnekId}`);
            responseText = (response.data as string).split('<p>')[1].split('</p>')[0].replace(/<br \/>/g, '');
            await anekBRepository.save(randomAnekId);
        }
        return responseText;
    }
}

export const anekService = new AnekBService();