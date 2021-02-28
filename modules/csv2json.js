/**
 * Парсер из таблицы в обект
 * @param  {String} csv Сырая таблица
 * @return {Object}     Результат
 */
export default function csv2json(csv) {
    let subName = null;
    const obj = {};
    const data = csv
        .trim()
        .split(/\r?\n/);
    const headers = data
        .shift()
        .trim()
        .split(',');

    if (headers.length <= 1) {
        return simpleArray(data);
    }
    for (let i = 0; i < data.length; i++) {
        const string = data[i].split(',');
        const [ first ] = string;

        if (!string.length) continue;
        if (first) {
            subName = first.trim();
            obj[subName] = {};
        }
        for (let j = 0; j < string.length; j++) {
            const header = headers[j];
            const value = fixValue(string[j]);
            const stockValue = obj[subName][header];

            if (value.constructor === String && !value) continue;

            if (stockValue === undefined || stockValue === '') {
                obj[subName][header] = value;
            } else if (Array.isArray(stockValue)) {
                obj[subName][header].push(value);
            } else {
                obj[subName][header] = [ stockValue, value ];
            }
        }
    }
    // return removeDupsFromArrays(obj);
    return obj;
}

function fixValue(val) {
    if (isNaN(val)) {
        return val.trim();
    }
    return parseInt(val, 10) || '';
}

// // массив, сравнивать i и i+1, если все элементы равны установить вместо массива i[0] || {key:[1,1,1,1]} => {key:1}
// function removeDupsFromArrays(obj) {
//     if (obj.constructor === Object) {
//         Object.keys(obj).forEach((k) => {
//             obj[k] = removeDupsFromArrays(obj[k]);
//         });
//     } else {
//         Object.entries(obj)
//             .forEach(([key, item]) => {
//                 if (Array.isArray(item) && item.some((v) => v === item[0])) {
//                     [obj[key]] = item;
//                 }
//             });
//         return obj;
//     }
//     return obj;
// }

// если не таблица, а просто данные в столбик
function simpleArray(array) {
    return {
        array: array
            .filter(({ length }) => length),
        // .map((e) => fixValue( null, e));
    };
}
