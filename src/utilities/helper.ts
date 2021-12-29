import { Headers } from '@angular/http';
import {  differenceInMinutes } from 'date-fns';
import { HttpHeaders } from '@angular/common/http';
import UsersUtility from './userutility';
export default class Helper {
    static baseUrl = "https://localhost:5001/";
    // static baseUrl ='http://localhost:8080/'
    static GeCurrenttLanguage() {
        var language = localStorage.getItem('language');

        if (language == null)
            return 'en-US';
        else
            return language;
    }
    static getDateDifference(fromDate: Date, toDate: Date) {
        let days: number, hours: number, minutes: number;
        minutes = differenceInMinutes(toDate, fromDate);
        days = Math.floor((minutes) / 1440);
        hours = Math.floor(minutes / 60 % 24);
        minutes = Math.floor(minutes % 60);
        return (days > 0 ? days + " days " : "") + (hours > 0 ? hours + " Hours " : "") + (minutes > 0 ? minutes + " Minutes " : "");
    }
    static isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear()
    }

    static GetHeaders() {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

}
