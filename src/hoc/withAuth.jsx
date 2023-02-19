import React from 'react';


// Check with server the validity of the token to redirect user if
// token expired or even if there is no token

const withAuth = Component => ({ ...props }) => {
    <Component {...props} />
}

export default withAuth;