import prettier from 'prettier';
import { existsSync, mkdirSync } from 'fs';
import { dirname, resolve, parse, format } from 'path';

import { writeFile2 } from '../../utils/dir.js';
// import NestedRawJson from './NestedRawJson.js';
// import byTypes from '../config/byTypes.js';
import config from './config.js';

const savePath = resolve('./dist');

/**
 * Сохранить в файл
 * @param  {Function<Runner>} raw  Объект, который нужно сохранить
 * @param  {Object} program        Опции верхнего процесса
 * @return {Promise<void>|Error}
 */
export default function saveFile(raw, { type }) {
    const { data, metadata } = raw.render();
    const originalFile = parse(metadata.originalFile);
    const path = format({
        ...originalFile,
        ext: `.${type}`,
        base: null,
        dir: resolve(originalFile.dir, savePath),
    });

    if (!type in config) {
        throw new Error(`Неправильный или не поддерживаемый тип для сохранения файлов: "${type}"`);
    }

    const { formatting, opts } = config[type];
    if (!existsSync(dirname(path))) {
        mkdirSync(dirname(path));
    }
    return writeFile2(path, prettier.format(
        formatting(data, metadata.runnerName), {
            ...opts,
            ...raw.prettierConfig,
        }))
        .then(() => {
            console.log('Файл', `"\x1b[32m${path}\x1b[0m"`, 'создан');
        })
        .catch((err) => {
            throw err;
        });
}

// // добавить захардкоженый контент
// function addContent(json) {
//     const needData = /(\w+)\..+?/.exec(json.metadata.originalFile)[1];
//     const byType = byTypes[needData] || {};
//     const result = {};
//     let registered = [];
//
//     result.export = 'data';
//     if (json[Object.keys(json)[0]].constructor !== NestedRawJson) {
//         return result; // нет вложенных объектов - просто данные
//     }
//     Object.keys(byType)
//         .forEach((key) => registered = registered.concat(byType[key]));
//     const notRegistered = Object.keys(json)
//         .filter((key) => !registered.includes(key));
//     if (notRegistered.length !== 0) {
//         if (Object.keys(byType).length !== 0) {
//             byType.notregistered = notRegistered;
//         } else {
//             byType.default = notRegistered;
//         }
//     }
//     result.content = `let byTypes= ${JSON.stringify(byType, null, 2)}`;
//     result.export += ', byTypes';
//     return result;
// }
