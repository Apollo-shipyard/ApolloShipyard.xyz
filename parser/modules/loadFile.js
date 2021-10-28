import { basename } from 'path';
import { readFile } from 'fs/promises';

import { Pure } from './Runner.js';

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
    const MyRunner = runners.find(({ config: { files } }) => {
        if (files.constructor === String && files === fileName) {
            return true;
        }
        if (files.constructor === RegExp && files.test(fileName)) {
            return true;
        }
    });

    if (MyRunner) {
        return new MyRunner({
            raw: file,
            metadata,
        });
    }
    return new Pure({
        raw: file,
        metadata,
    });
}
