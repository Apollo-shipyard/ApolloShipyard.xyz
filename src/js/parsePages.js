import pages from '@Regulation/pages.js';

export function getRoutes() {
    return [
        ...pages.reduce(reduce, []),
        { path: '/*', redirect: '/404' }, // универсальная страница для 404
    ];

    function reduce(acc, { name, link: { router: path }, component, children }) {
        if (component) {
            acc.push({ name, path, component });
        }
        if (children) {
            acc.push(
                ...children.reduce(reduce, []),
            );
        }
        return acc;
    }
}

// function getPages(data) {
//     const result = [];
//
//     data.forEach((item) => {
//         if ('text' in item) {
//             const resultItem = {};
//
//             resultItem.text = item.text;
//             if ('childrens' in item) {
//                 if (!Array.isArray(resultItem.childrens)) resultItem.childrens = [];
//                 resultItem.childrens = resultItem.childrens.concat(getPages(item.childrens));
//             }
//             if ('link' in item) {
//                 resultItem.link = item.link;
//                 resultItem.icon = item.icon;
//             }
//
//             result.push(resultItem);
//         }
//     });
//     return result;
// }
