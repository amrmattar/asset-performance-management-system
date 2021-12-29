import { Headers } from '@angular/http';
export default class UsersUtility {
    static SetCurrentUser(currentUser: any) {
         
        localStorage.setItem('currentUser', currentUser);
        localStorage.setItem("userToken",JSON.parse(localStorage.getItem('currentUser')).token)
    }
    static GetLogedInUser() {
        if (localStorage.getItem('currentUser') != undefined)
            return JSON.parse(localStorage.getItem('currentUser'));
        else
            return null;
    }
    static GetLogedInUserToken() {
        if (localStorage.getItem('currentUser') != undefined)
            return JSON.parse(localStorage.getItem('currentUser')).token;
        else
            return null;
    }
    static RestToken() {
        localStorage.removeItem('currentUser');
    }
    static GetAuthenticationHeaders() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST');
        var t = localStorage.getItem("accessToken");
        if (t) {
            headers.append("Authorization", "Bearer " + this.GetLogedInUserToken());
        }
        return headers;
    }
}
