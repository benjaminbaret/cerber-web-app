import React from 'react';
import Cookies from 'js-cookie';

function UsernameDisplay() {
    const username = Cookies.get('username');
    if (username === undefined) {
        return <>{username}</>;  // ou <></>
    } else {
        return <>{username}</>;
    }
}
export default UsernameDisplay;
