import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { PrivateRoute } from '../../routes/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoute />', () => {

    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();

    test('debe de mostrar el componente si esta autenticado y gurdad en localStorage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={true}
                    component={() => <span>Culaquier cosa!!</span>}
                    {...props}
                />
            </MemoryRouter>
        )
        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel')
    })

    test('debe de bloquear el componente si no está autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={() => <span>Culaquier cosa!!</span>}
                    {...props}
                />
            </MemoryRouter>
        )
        // console.log('======>', wrapper.html()); cuando se realiza Redirect el arroja un vació lo que significa que funcionó
        expect(wrapper.html()).toBe('');
        expect(wrapper.find('span').exists()).toBe(false);
    })


})
