import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {

    const { dispatch } = useContext(AuthContext);
    const lastPath = localStorage.getItem('lastPath') || '/'

    const handleLogin = () => {
        // console.log(dispatch('[auth] login'));
        dispatch({ type: types.login, payload: { name: 'Camilo' } });
        history.replace(lastPath);
        // history.push('/');
    }

    return (
        <div className="container mt-5">
            <h1>Login Screen</h1>
            <hr />

            <button
                className="btn btn-primary"
                onClick={handleLogin}
            >
                Ingresar
            </button>
        </div>
    )
}
