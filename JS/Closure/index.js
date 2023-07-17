/*
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-17 10:42:57
 */
/**
 * 函数作为参数
 */

function create(fn) {
    let a = 100;
    fn()
 }

// let a = 200;
function fn() { 
    console.log('a = ', a);
}
create(fn);
var a = 200;


/**
 * 函数作为返回值
 */
function createFn() { 
    const b = 100;
    return function () { 
        console.log('b = ', b);
    }   
}

const b = 200;
createFn()();