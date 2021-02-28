import Runner from '../modules/Runner.js';

export default class LocStrings extends Runner {
    static get config() {
        return {
            files: /loc_strings_\w+/,
        };
    }

    static main(raw, metadata) {
        const data = parse(raw);
        return this.newJson(data, metadata);
    }
}

function parse(csv) {
    const regex = /"(.*)"/;
    const obj = {};
    const data = csv.trim().split(/\r?\n/);

    for (let i = 0; i < data.length; i++) {
        const string = data[i].split(',');
        const key = string[0].replace(regex, '$1');

        if (key.startsWith('//')) continue;
        obj[key] = string[1].replace(regex, '$1');
    }
    return obj;
}
