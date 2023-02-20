import React from 'react';
import withAuth from '../hoc/withAuth';

const Home = ({ isAuth }) => {
    return (
        <React.Fragment>
            <div>Welcome Home</div>
            {isAuth && <div>You are log :)</div>}
        </React.Fragment>
    )
};

export default withAuth({ redirect: false })(Home);