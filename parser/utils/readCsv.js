import { join } from 'path';
import { readFileSync } from 'fs';
import csv2json from '../modules/csv2json.js';

/**
 * Загрузить не изменённый ранерами объект
 * @param  {String} fileName  Имя файла, в директории с сырыми данными
 * @return {Object}           Готовый объект
 */
export default function(fileName) {
    const file = readFileSync(`${join('./raw/', fileName)}.csv`, 'utf8');
    return csv2json(file);
}
