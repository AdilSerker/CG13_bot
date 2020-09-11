import { randomInteger } from "../../components/utils/randomize";

export const concreting = (text: string) => {
    let punctuationless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ');
    let finalString = punctuationless.replace(/\s{2,}/g, ' ');
    let concreteWord = finalString.split(' ');
    if (concreteWord.length === 1 && randomInteger(0, 100) > 95) {
        return concrete(concreteWord[0].toLowerCase());
    }

    return '';
}

const concrete = (text: string): string => {
  
    for (let i = 0; i < text.length; ++i) {
        if (text[i] === 'а' || text[i] === 'я') {
            return 'Xyя' + '' + text.slice(i+1) + '!1';
        }
        if (text[i] === 'э' || text[i] === 'е') {
            return 'Xyе' + '' + text.slice(i+1) + '!!1';
        }
        if (text[i] === 'у' || text[i] === 'ю') {
            return 'Xyю' + '' + text.slice(i+1) + '!!1';
        }
        if (text[i] === 'о' || text[i] === 'е') {
            return 'Xyё' + '' + text.slice(i+1) + '!11';
        }
        if (text[i] === 'ы' || text[i] === 'и') {
            return 'Xyи' + '' + text.slice(i+1) + '!11';
        }
    }
    return 'Xyй1';
}