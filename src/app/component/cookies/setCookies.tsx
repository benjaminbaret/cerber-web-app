import { parseCookies, setCookie } from 'nookies';

function setCookiesAA(username: string, userId: string) {
    const existingCookies = parseCookies();
    setCookie(null, 'id', userId, {});
    setCookie(null, 'username', username, {});
    if (!userId || !username) {
        window.alert("Failed to connect, Try again");
        window.location.href = 'http://localhost:3000';
    }
    return 0;
}