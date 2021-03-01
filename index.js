import { readdirSync } from 'fs';
import { pathToFileURL } from 'url';
import { basename, resolve } from 'path';

import Timer from './modules/Timer.js';
import program from './modules/program.js';
import loadSaveFile from './utils/loadSaveFile.js';
import { walkDir, wipeDir } from './utils/dir.js';

const time = new Timer();
const runnersPath = resolve('./runners');
const pathRaw = resolve('./raw');
const pathSave = resolve('./dist');
const files = getFiles();
const ignoreFiles = [];
const loadRunners = readdirSync(runnersPath)
    .filter((file) => basename(file, '.js'))
    .map((file) => import(pathToFileURL(resolve(runnersPath, file)).href));


const runners = await Promise.all(loadRunners)
    .then((runs) => runs
        .map((e) => e.default)
        .filter(({ config, name }) => {
            if (config) { // TODO мб норм валидатор
                return true;
            }
            console.log('\x1b[31m %s \x1b[0m', `Invalid runner "${name}" - pass`);
        }),
    )
    .catch(err);

runners.forEach(({ config }) => {
    if ('ignoreFiles' in config) {
        ignoreFiles.push(config.ignoreFiles);
    }
});

await Promise.all(files
    .filter((f) => !ignoreFiles.includes(f))
    .map((file) => loadSaveFile(file, runners, program.opts())),
)
    .catch(err);

console.log('\x1b[32m[✓] \x1b[0m Готово! (%s сек.)', time.final);


function getFiles() {
    if (program.args.length) {
        return program.args
            .map((f) => resolve(f));
    } else {
        if (!program.noWipe) wipeDir(pathSave);
        return walkDir(pathRaw)
            .filter((e) => (e !== undefined && e.endsWith('.csv')));
    }
}
function err(error) {
    console.log('\x1b[31m[х]\x1b[0m', `Ошибки в выполнении.`, error, error.stack);
    process.exit(-1);
}

