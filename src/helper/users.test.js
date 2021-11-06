const {findUserByString} = require('./users');

const users = ['Дима', 'Денис', 'Саша'].map(alias => ({alias}));

describe('findUserByString', () => {
    test('findUserByString("Дима") = "Дима"', () => {
        expect(findUserByString('Диме', users).alias).toEqual('Дима')
    });

    test('findUserByString("Диме") = "Дима"', () => {
        expect(findUserByString('Диме', users).alias).toEqual('Дима')
    });

    test('findUserByString("Ди") = "Дима"', () => {
        expect(findUserByString('Ди', users).alias).toEqual('Дима')
    });

    test('findUserByString("Ден") = "Денис"', () => {
        expect(findUserByString('Ден', users).alias).toEqual('Денис')
    });

    test('findUserByString("Гриша") - не найдено', () => {
        expect(() => findUserByString('Гриша', users))
            .toThrow('Пользователь Гриша не найден')
    });

    test('findUserByString("Гриша") - не найдено', () => {
        expect(() => findUserByString('Гриша', []))
            .toThrow('Пользователь Гриша не найден')
    });

    test('findUserByString("Д") - неоднозначно', () => {
        expect(() => findUserByString('Д', users))
            .toThrow('Д не определяет пользователя однозначно между Дима / Денис')
    });
});