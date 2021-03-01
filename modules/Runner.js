import readCsv from '../utils/readCsv.js';
import JsonRaw from './JsonRaw.js';
import csv2json from './csv2json.js';

export default class Runner {
    constructor(args) {
        this.args = args;
        this.args.metadata.runnerName = this.constructor.name;
        // debugger;
    }

    readCsv(...args) {
        return readCsv(...args);
    }

    parse(...args) {
        return csv2json(...args);
    }

    newJson(...args) {
        return new JsonRaw(...args);
    }

    // static get readIgnoreFiles() {
    //     const { ignoreFiles } = this.config;
    //     if (!ignoreFiles) return ignoreFiles;
    //
    //     return ignoreFiles.map((name) => this.readCsv(name));
    // }
}

export class Pure extends Runner {
    constructor(args) {
        super(args);
        this.metadata.runnerName = null;
    }

    static config = {}

    render() {
        const data = this.parse(this.args.raw);
        return this.newJson(data, this.args.meta);
    }
}
