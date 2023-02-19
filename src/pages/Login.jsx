import React from 'react';
import axios from 'axios';
import useToken from '../hooks/useToken';

const login = async ({ username, password }) => {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password
    });
    return response;
}

const Login = () => {
    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();

    const { token, setToken } = useToken();

    const handle = async e => {
        e.preventDefault();
        try {
            const response = await login({ username, password });
            console.log(response.data);
            setToken(response.data.token);
        } catch (err) {
            console.log('ntm');
        }
    }

    console.log(token);
    if (!token)
        return (
            <div>
                <input type={'text'} onChange={(e) => setUsername(e.target.value)} />
                <input type={'text'} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handle}>log in</button>
            </div>
        )
    return (
        <div>yes !</div>
    )
};

export default Login;