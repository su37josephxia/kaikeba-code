module.exports = {
    formatDate(time) {
        var date = new Date(time * 1000);
        var YYYY = date.getFullYear();
        var MM = date.getMonth() + 1;
        var DD = date.getDate();
        var hh = date.getHours();
        var mm = date.getMinutes();
        var ss = date.getSeconds();

        MM = MM < 10 ? ('0' + MM) : MM;
        DD = DD < 10 ? ('0' + DD) : DD;
        hh = hh < 10 ? ('0' + hh) : hh;
        mm = mm < 10 ? ('0' + mm) : mm;
        ss = ss < 10 ? ('0' + ss) : ss;

        return YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
    }
}