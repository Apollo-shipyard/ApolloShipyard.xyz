export default function({ head, body }) {
    const newHead = [[], []];
    const newBody = [];

    Object.entries(head)
        .forEach(([key, value]) => {
            headMask([key, value], newHead);
            bodyMask([key, body[key]], newBody);
        });

    return {
        head: newHead,
        body: rotateMatrix(newBody),
    };
}

function headMask([key, value], [firstR, secondR]) {
    if (key === 'default') {
        firstR.push(...value.map((e) => ({
            value: e,
            rowspan: value.length,
        })));
    } else {
        firstR.push({
            value: key,
            colspan: value.length,
        });
        secondR.push(...value
            .map((value) => ({ value })),
        );
    }
}
function bodyMask([key, value], body) {
    body.push(...value.map((e) => (
        e.map((value) => ({ key, value }))
    )));
}
function rotateMatrix(matrix) {
    return matrix[0]
        .map((value, column) => matrix
            .map((row) => ({
                value: row[column].value,
                key: row[column].key,
            })),
        );
}
