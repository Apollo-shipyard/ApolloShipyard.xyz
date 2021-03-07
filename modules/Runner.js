import readCsv from '../utils/readCsv.js';
import JsonRaw from './JsonRaw.js';
import csv2json from './csv2json.js';

export default class Runner {
    constructor(args) {
        this.args = args;
        this.args.metadata.runnerName = this.constructor.name;
    }

    readCsv(...args) {
        return readCsv(...args);
    }

    multiReadCsv(names) {
        return names.map((n) => (
            this.readCsv(n)
        ));
    }

    parse(...args) {
        return csv2json(...args);
    }

    newJson(...args) {
        return new JsonRaw(...args, this.args.metadata);
    }
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
