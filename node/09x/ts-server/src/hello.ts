function decoate(s) {
  return function (target, property, descriptor) {
    console.log("property", property);
    // AOP切面

    const old = descriptor.value;
    descriptor.value = (msg) => {
      msg = `${s}${s}${msg}${s}${s}`;
      // aop
      return old.apply(null, [msg]);
    };
    return descriptor;
  };
}

class Log {
  // anotation 注解风格的装饰器
  @decoate('*')
  print(msg) {
    console.log(msg);
  }
}

// const createDec = s => (target, property) => {
//     const old = target.prototype[property]
//     target.prototype[property] = msg => {
//         msg = `${s}${s}${msg}${s}${s}`
//         old(msg)
//     }
// }
// const dec = createDec('*')

// dec(Log,'print')

// ==hello==
// --hello--

const log = new Log();
log.print("hello");
