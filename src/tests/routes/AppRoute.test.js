import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../routes/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRoute />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }
    test('debe de mostrar login si no está autenticado', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        // console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot()
    })

    test('debe de mostrar el componente de Marvel si esta autenticado', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                name: 'Camilo',
                logged: true
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />
            </AuthContext.Provider>
        );
        // console.log(wrapper.html());
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBe(true)
    })
    

})
