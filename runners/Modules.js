import Runner from '../modules/Runner.js';

export default class Modules extends Runner {
    constructor(args) {
        super(args);
    }

    static config = {
        files: 'modules',
        ignoreFiles: [ 'fighters' ],
    }

    render() {
        // const [fighters] = this.readIgnoreFiles;
        const data = this.parse(this.args.raw);

        return this.newJson(data, this.args.metadata);
    }
}
