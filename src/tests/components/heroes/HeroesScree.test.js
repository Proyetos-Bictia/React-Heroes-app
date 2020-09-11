import '@testing-library/jest-dom';
import { mount, shallow } from 'enzyme';
import React from 'react';
import { MemoryRouter, Router, Route } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';
import { HeroesScreen } from '../../../components/heroes/HeroesScreen';

describe('Pruebas en <HeroScreen />', () => {

    const historyMock = {
        length: 10,
        goBack: jest.fn(),
        push: jest.fn(),
    }


    test('debe de mostrar el redirect si no hay argumentos en el url ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroesScreen history={historyMock} />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('Redirect').exists()).toBe(true)
    })

    test('debe de mostrarse correctamente si hay un hero', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={HeroesScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find('.row').exists()).toBe(true)
        // console.log(wrapper.html());
    });

    test('debe de regresar a la pantalla anterior con PUSH', () => {
        const historyMock = {
            length: 1,
            goBack: jest.fn(),
            push: jest.fn(),
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroesScreen history={historyMock} />}
                />
            </MemoryRouter>
        );
        wrapper.find('button').simulate('click');
        expect(historyMock.push).toHaveBeenCalledWith('/');
        expect(historyMock.goBack).not.toHaveBeenCalled()
    })

    test('debe de regresar a la pantalla anterior GOBACK', () => {
        const historyMock = {
            length: 3,
            goBack: jest.fn(),
            push: jest.fn(),
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroesScreen history={historyMock} />}
                />
            </MemoryRouter>
        );
        wrapper.find('button').simulate('click');
        expect(historyMock.push).not.toHaveBeenCalled();
        expect(historyMock.goBack).toHaveBeenCalledTimes(1)
    })

    test('debe de llamar el redirect si el heroId no existe', () => {
        const historyMock = {
            length: 3,
            goBack: jest.fn(),
            push: jest.fn(),
        }
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123131']}>
                <Route
                    path="/hero/:heroeId"
                    component={(props) => <HeroesScreen history={historyMock} />}
                />
            </MemoryRouter>
        );
        expect(wrapper).toEqual({})
    })

})
