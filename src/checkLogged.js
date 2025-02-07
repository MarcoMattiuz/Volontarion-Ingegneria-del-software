import { CheckLoggedinEndpoint } from "./endpoints";
export async function checkIfLoggedIn() {
    try {
        console.log("cookie"+ document.cookie + "a");
        const response = await fetch(CheckLoggedinEndpoint, {
            method: 'GET',
            credentials: 'include',
        });
        if (response.ok) {
            console.log("-----------------loggato");
            return true;
            
        } else {
            console.log("-----------------non loggato");
            return false;
        }
    } catch (error) {
        console.error('Request failed', error);
    }
}