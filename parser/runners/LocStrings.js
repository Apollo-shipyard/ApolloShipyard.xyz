import Runner from '../modules/Runner.js';

export default class LocStrings extends Runner {
    prettierConfig = {
        printWidth: 420,
    }

    static config = {
        files: /loc_strings_\w+/,
    }

    render() {
        return this.newJson(parseKeyValue(this.args.raw));
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
