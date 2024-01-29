import React from 'react';
import Cookies from 'js-cookie';

function UsernameDisplay() {

    const username = Cookies.get('usernameCerberUpdate');

    if (username === undefined||username===null||username==='') {
        window.alert("Please Sign In or Sign Up to access this page !");
        window.location.href = 'http://localhost:3000';
    } else {
        return <>{username}</>;
    }
}
export default UsernameDisplay;
