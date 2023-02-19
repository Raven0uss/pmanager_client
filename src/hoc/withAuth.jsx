import axios from 'axios';
import { get } from 'lodash';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { clearToken, getToken } from '../hooks/useToken';

// Need to add the token to the header
// Need to manage the display of single elements (Apps for navbar for exemple)
// if auth or not (maybe use context ?)

const withAuth = Component => ({ ...props }) => {
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const token = getToken();
            if (!token) {
                clearToken();
                navigate('/login');
                return;
            }
            const response = await axios.post('http://localhost:8080/api/auth/verify-token', {
                token,
            })
            if (get(response, 'data.userId')) {
                setLoading(false);
                return;
            }
            clearToken();
            navigate('/login');
        })();
    }, [navigate])

    if (loading) {
        return <div>Loading...</div>
    }
    return <Component {...props} />
}

export default withAuth;