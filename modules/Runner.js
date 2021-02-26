import readCsv from '../utils/readCsv.js';
import JsonRaw from './JsonRaw.js';

export default class Runner {
    static readCsv(...args) {
        return readCsv(...args);
    }

    static newJsonRaw(...args) {
        return new JsonRaw(...args);
    }

    static get readIgnoreFiles() {
        const { ignoreFiles } = this.config;
        if (!ignoreFiles) return ignoreFiles;

        return ignoreFiles.map((name) => this.readCsv(name));
    }
}
