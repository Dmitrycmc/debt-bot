const renderTemplate = require('./render-template');

describe('renderTemplate', () => {
    test('renderTemplate - not found', () => {
        expect.assertions(1);
        return renderTemplate('file')
            .catch(e => expect(e.message).toEqual('Файл file.html не найден'));
    });

    test('renderTemplate - found', () => {
        return renderTemplate('greetings')
            .then(data => expect(data.startsWith("Привет")).toEqual(true));
    });

    test('renderTemplate with params', () => {
        return renderTemplate('registered-successfully', {
            name: 'name',
            aliases: 'alias1, alias2'
        }).then(data => expect(data).toEqual("✅ Вы зарегистрированы, как name (alias1, alias2)"));
    });

    test('renderTemplate without params', () => {
        return renderTemplate('registered-successfully')
            .then(data => expect(data).toEqual("✅ Вы зарегистрированы, как {{name}} ({{aliases}})"));
    });
});