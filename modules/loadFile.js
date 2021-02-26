import { basename } from 'path';
import { readFile } from 'fs/promises';

import JsonRaw from './JsonRaw.js';

/**
 * Загрузить файл и обработать ранерами
 * @param {String} path         Путь к файлу
 * @param {Array} runners
 * @return {Function<JsonRaw>}  Готовый объект
 * @async
 */
export default async function(path, runners) {
    const metadata = { originalFile: path, runnerName: null };
    const file = await readFile(path, 'utf-8');
    const fileName = basename(path, '.csv');
    const runner = runners.find(({ config: { files } }) => {
        if (files.constructor === String && files === fileName) {
            return true;
        }
        if (Array.isArray(files) && files.includes(fileName)) {
            return true;
        }
        if (files.constructor === RegExp && files.test(fileName)) {
            return true;
        }
    });

    if (runner) {
        metadata.pluginName = runner.name;
        return runner.main(file, metadata);
    } else {
        return new JsonRaw(file, metadata);
    }
}
