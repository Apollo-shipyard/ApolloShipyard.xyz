export default class {
    constructor() {
        this.startTime = new Date().getTime();
    }

    get final() {
        return (new Date().getTime() - this.startTime) / 1000;
    }
}
