import React from 'react';
import Cookies from 'js-cookie';

function UsernameDisplay() {
    const username = Cookies.get('username');
    if (username === undefined) {
        return null;  // ou <></>
    } else {
        return <p>{username}</p>;
    }
}
export default UsernameDisplay;
