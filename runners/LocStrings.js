import Runner from '../modules/Runner.js';

export default class LocStrings extends Runner {
    static config = {
        files: /loc_strings_\w+/,
    }

    render() {
        const data = parseKeyValue(this.args.raw);
        return this.newJson(data, this.args.metadata);
    }
}

function parseKeyValue(csv) {
    return Object.fromEntries(
        csv
            .trim()
            .split(/\r?\n/)
            .filter((s) => !s.startsWith('//'))
            .map((s) => s
                .split(/"(.+?)","(.+?)"/)
                .slice(1, 3),
            ),
    );
}
