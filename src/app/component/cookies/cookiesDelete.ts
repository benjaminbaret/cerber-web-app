import { destroyCookie } from 'nookies';

function deleteCookie() {
    destroyCookie(null, 'userIdCerberUpdate', {
        path: '/',
    });
    destroyCookie(null, 'usernameCerberUpdate', {
        path: '/',
    });
}

