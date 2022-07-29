import { HttpClient } from './../../components/http/httpClient';
import { randomInteger } from "../../components/utils/randomize";
import { anekBRepository } from '../../infrastructure/repositories/AnekBRepository';

class AnekBService {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient({ url: 'https://baneks.ru'});
    }

    public async getRandomAnek(chatId: string): Promise<string> {
        const aneks = await anekBRepository.getList(chatId);

        const showedAneks = aneks.map(item => item.anek_id);

        let newAnekIds = [];
        for (let i = 0; i < 1142; ++i) {
            if (!showedAneks.includes(i + 1)) {
                newAnekIds.push(i + 1);
            }
        }

        let responseText = 'А все, а пиздец. Запас анеков исчерпан! нужен новый ресурс (яма с говном)';

        if (newAnekIds.length) {
            const randomAnekId = randomInteger(0, 1142);

            const response = await this.http.get(`https://baneks.ru/${randomAnekId}`);
            responseText = (response.data as string).split('<p>')[1].split('</p>')[0].replace(/<br \/>/g, '');
            await anekBRepository.save(randomAnekId, chatId);
        } else {
            await anekBRepository.deleteAll(chatId);
        }
        return responseText;
    }
}

export const anekService = new AnekBService();