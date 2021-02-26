/**
 * Парсер из таблицы в обект
 * @param  {String} csv      Сырая таблица
 * @param  {Array=} headers  Заголовки. По умолчанию первая строчка таблицы
 * @return {Object}          Результат
 */
export default function csv2json(csv, headers = null) {
    const obj = {};
    const data = csv.trim().split(/\r?\n/);
    headers = (headers) ? headers : data[0].split(',');
    let subName = null;

    if (headers.length <= 1) {
        return simpleArray(data);
    }
    for (let i = 1; i < data.length; i++) {
        const string = data[i].split(',');

        if (!string.length) continue;
        if (string[0]) {
            subName = string[0]
                .replace(/["']+/g, '')
                .trim();
            obj[subName] = {};
        }
        for (let j = 0; j < string.length; j++) {
            const header = headers[j];
            const value = string[j].trim();
            const stockValue = obj[subName][header];

            if (value === undefined || !value.length) continue;
            // value = fixValue(header, value);

            if (stockValue === undefined || stockValue === '') {
                obj[subName][header] = value;
            } else if (Array.isArray(stockValue)) {
                obj[subName][header].push(value);
            } else {
                obj[subName][header] = [stockValue, value];
            }
        }
    }
    // return removeDupsFromArrays(obj);
    return obj;
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
            .filter((e) => e.length),
        // .map((e) => fixValue( null, e));
    };
}
