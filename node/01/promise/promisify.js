module.exports = function promisify(fn) {
    return function (...args) {
        return new Promise(function (resolve,reject) {
            args.push(function (err,...arg) {
                if(err){
                    reject(err)
                }else{
                    resolve(...arg);
                }
            });
            fn.apply(null, args);
        })
    }
}