import React from 'react';
import withAuth from '../hoc/withAuth';

const Apps = () => {
    return <div>My apps</div>
};

export default withAuth({ redirect: true, to: '/' })(Apps);