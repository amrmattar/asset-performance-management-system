"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
class Helper {
    static GeCurrenttLanguage() {
        var language = localStorage.getItem('language');
        if (language == null)
            return 'en-US';
        else
            return language;
    }
    static getDateDifference(fromDate, toDate) {
        let days, hours, minutes;
        minutes = date_fns_1.differenceInMinutes(toDate, fromDate);
        days = Math.floor((minutes) / 1440);
        hours = Math.floor(minutes / 60 % 24);
        minutes = Math.floor(minutes % 60);
        return (days > 0 ? days + " days " : "") + (hours > 0 ? hours + " Hours " : "") + (minutes > 0 ? minutes + " Minutes " : "");
    }
}
exports.default = Helper;
Helper.baseUrl = "http://api.accurdigital.com/";
Helper.isToday = (someDate) => {
    const today = new Date();
    return someDate.getDate() == today.getDate() &&
        someDate.getMonth() == today.getMonth() &&
        someDate.getFullYear() == today.getFullYear();
};
//# sourceMappingURL=helper.js.map