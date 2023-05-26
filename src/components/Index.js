import React from 'react';
import Signin from './SingIn';
import Profile from './Profile';

function Index() {
    const token = localStorage.getItem('access_token');

    if (!token) {
        return <div className="wrapper">
            <Signin />
        </div>;
    }

    return (
        <div className="wrapper">
            <Profile />
        </div>
    );
}

export default Index;
