import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DashBoardRoutes } from '../../routes/DashBoardRoutes';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en el <DasboardRoutes />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            name: 'Camilo',
            logged: 'true'
        }
    }

    test('debe de mostrarse correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <DashBoardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect(wrapper).toMatchSnapshot()
        expect(wrapper.find('.text-info').text().trim()).toBe('Camilo')
        expect(wrapper.find('.navbar').exists()).toBe(true)
        // console.log(wrapper.html());
    })

})
