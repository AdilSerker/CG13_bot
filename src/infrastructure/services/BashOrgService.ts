import { HttpClient } from '../../components/http/httpClient';
import { decode } from 'iconv-lite';
import { parse } from 'node-html-parser';

class BashOrgService {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient({ url: 'http://bashorg.org' });
    }

    public async getRandomBashOrg(): Promise<string> {

        const response = await this.http.get(`http://bashorg.org/casual`, { responseType: "arraybuffer" });
        
        const html = decode(response.data, "win1251");

        const root = parse(html);

        const quoteHtml = parse(root.querySelector('.q').toString().split('</font></a></div>')[1]).toString();

        return quoteHtml
            .replace(/<div>/gi, '')
            .replace(/<\/div>/gi, '')
            .replace(/<br>/gi, '\n')
            .replace(/&quot;/gi, '**');
    }
}

export const bashOrgService = new BashOrgService();