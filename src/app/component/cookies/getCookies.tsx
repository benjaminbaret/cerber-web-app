import { parseCookies} from 'nookies';

function getUserIdCookies() {
    const cookies = parseCookies();
    const userId = cookies.userIdCerberUpdate;
    if (!userId) {
        window.alert("Please Sign In or Sign Up to access this page !");
        window.location.href = 'http://localhost:3000';
    }
    return userId;
}

function getUsernameCookies() {
    const cookies = parseCookies();
    const username = cookies.usernameCerberUpdate;
    if (!username) {
        window.alert("Please Sign In or Sign Up to access this page !");
        window.location.href = 'http://localhost:3000';
    }
    return username;
}