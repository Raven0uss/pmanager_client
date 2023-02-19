import React, { useEffect } from 'react';
import axios from 'axios';
import useToken, { clearToken } from '../hooks/useToken';
import { get } from 'lodash';
import { useNavigate } from 'react-router';

const login = async ({ username, password }) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
    });
    return response;
}

const Login = () => {
    const [loading, setLoading] = React.useState(true);
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();

    const { token, setToken } = useToken();
    const navigate = useNavigate();

    const handle = async e => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            setToken(response.data.token);
        } catch (err) {
            // Here manage the login error
            console.error(err);
        }
    }

    useEffect(() => {
        (async () => {
            const response = await axios.post('http://localhost:8080/api/auth/verify-token', {
                token,
            }).catch(() => {
                clearToken();
            });
            if (get(response, 'data.userId')) {
                navigate('/');
            }
            setLoading(false);
        })();
    }, [navigate, token])

    if (loading) {
        return <div>Loading...</div>
    }
    if (!token)
        return (
            <div>
                <input type={'text'} onChange={(e) => setUsername(e.target.value)} />
                <input type={'text'} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handle}>log in</button>
            </div>
        )
};

export default Login;