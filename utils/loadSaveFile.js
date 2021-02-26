import loadFile from '../modules/loadFile.js';
import saveFile from '../modules/saveFile.js';

const err = (error) => {
    throw error;
};

export default async function(file, runners, program) {
    const data = await loadFile(file, runners).catch(err);
    return saveFile(data, program).catch(err);
}
