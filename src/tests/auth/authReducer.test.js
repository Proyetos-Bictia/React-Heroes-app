const { authReducer } = require("../../auth/authReducer");
import '@testing-library/jest-dom';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
    const user = {
        name: 'Camilo',
        logged: false,
    }
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer(user, {});
        expect(state).toEqual(user);
    });

    test('debe de autenticar y colocar el name del usuario', () => {
        const action = {
            type: types.login,
            payload: user
        }
        const { logged } = authReducer({}, action);
        expect(logged).toBe(true);
    });

    test('debe de borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout,
            payload: user
        }
        const { logged } = authReducer({}, action);
        expect(logged).toBe(false);
    });

})
