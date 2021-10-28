/**
 * Парсер из таблицы в обект
 * @param  {String} csv Сырая таблица
 * @return {Object}     Результат
 */
export default function csv2json(csv) {
    let subName = null;
    const obj = {};
    const [ headers, ...data ] = csv
        .trim()
        .split(/\r?\n/)
        .filter(({ length }) => length)
        .map((s) => s.split(','));

    if (headers.length <= 1) {
        return simpleArray(data);
    }
    data.forEach((string) => {
        if (string[0]) {
            subName = string[0].trim();
            obj[subName] = {};
        }
        string.forEach((elem, i) => {
            const header = headers[i];
            const subObj = obj[subName];
            const stockValue = subObj[header];
            const value = fixValue(elem);

            if (value.constructor === String && !value) return;
            if (stockValue === undefined || stockValue === '') {
                subObj[header] = value;
            } else if (Array.isArray(stockValue)) {
                stockValue.push(value);
            } else {
                subObj[header] = [ stockValue, value ];
            }
        });
    });
    // return removeDupsFromArrays(obj);
    return obj;
}

function fixValue(val) {
    const parsed = parseInt(val, 10);
    if (isNaN(val) || isNaN(parsed)) {
        return val.trim();
    }
    return parsed;
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
