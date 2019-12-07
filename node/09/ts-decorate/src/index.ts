
// 类装饰器
function anotationClass(target) {
    console.log('===== Class Anotation =====')
    console.log('target :', target)
}

// 方法装饰器
function anotationMethods (target, property, descriptor) {
        // target 
        console.log('===== Method Anotation ' + property + "====")
        console.log('target:', target)
        console.log('property:', property)
        console.log('descriptor:', descriptor)
}

@anotationClass
class Example {
    @anotationMethods
    instanceMember() { }

    @anotationMethods
    static staticMember() { }
}

// // 类装饰器
// function anotationClass(id){
//     console.log('anotationClass evaluated', id);

//     return (target) => {
//         // target 类的构造函数
//         console.log('target 类的构造函数:',target)
//         console.log('anotationClass executed', id);
//     }
// }
// // 方法装饰器
// function anotationMethods(id){
//     console.log('anotationMethods evaluated', id);
//     return (target, property, descriptor) => {
//         // target 代表


//         // process.nextTick((() => {
//             target.abc = 123
//             console.log('method target',target)
//         // }))
//         console.log('anotationMethods executed', id);

//     }
// }

// @anotationClass(1)
// // @anotationClass(2)
// class Example {
//     @anotationMethods(1)
//     // @anotationMethods(2)
//     method(){}
// }

// console.log('Example.prototype',Example.prototype.constructor)




// 日志应用和切面实现
// console.log('日志应用和切面实现.....')
// function log(target, name, descriptor) {
//     var oldValue = descriptor.value;

//     descriptor.value = function () {
//         console.log(`Calling "${name}" with`, arguments);
//         return oldValue.apply(null, arguments);
//     }
//     return descriptor;
// }
// class Maths {
//     @log
//     add(a, b) {
//         return a + b;
//     }
// }
// const math = new Maths()
// math.add(2, 4)

