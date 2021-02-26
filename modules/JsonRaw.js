import csv2json from './csv2json.js';

/* Основной объект для данных таблицы */
export default class JsonRaw {
    constructor(csv, metadata = {}, headers = null) {
        this.data = csv2json(csv, headers);
        this.metadata = metadata;
    }
}
