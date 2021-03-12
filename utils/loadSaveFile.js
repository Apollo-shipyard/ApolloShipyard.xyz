import loadFile from '../modules/loadFile.js';
import saveFile from '../modules/saveFile/index.js';

const err = (error) => {
    throw error;
};

export default async function(file, runners, opts) {
    const data = await loadFile(file, runners).catch(err);
    return saveFile(data, opts).catch(err);
}
