import React from 'react';
import withAuth from '../hoc/withAuth';

const Home = ({ isAuth }) => {
    return (
        <React.Fragment>
            <div>Welcome Home</div>
            {isAuth ? <div>Check my projects</div> : <div>Login or create an account right now !</div>}
        </React.Fragment>
    )
};

export default withAuth({ redirect: false })(Home);