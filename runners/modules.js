import Runner from '../modules/Runner.js';

export default class Modules extends Runner {
    constructor() {
        super();
    }

    static get config() {
        return {
            files: 'modules',
            ignoreFiles: [ 'fighters' ],
        };
    }

    static main(raw, meta) {
        // const [fighters] = this.readIgnoreFiles;
        const data = this.parse(raw);

        return this.newJson(data, meta);
    }
}
