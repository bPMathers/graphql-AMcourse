import { isValidPassword } from '../src/utils/user';

test('Should reject password shorter than 8 characters', () => {
    expect(isValidPassword('1234567')).toBe(false);
})

test('Should reject password containing the "password" string', () => {
    expect(isValidPassword('123password345')).toBe(false);
})