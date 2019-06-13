// import { showCpu } from './state'
// setInterval(showCpu, 1000) 

@testable
class MyClass {};

function testable(target) {
    target.isTestable = true;
}

MyClass.isTestable;  // true
