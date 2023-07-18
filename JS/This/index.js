/*
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-17 11:15:19
 */

/**
 * 在对象中调用this
 */

const zhansan = {
    name: 'zhangsan',
    sayHi() { 
        console.log('this', this);
    },
    wait() { 
        // settimeout 全局对象内置方法 = window.setTimeout
        setTimeout(function () { 
            console.log('settimeout-this', this)
        }, 1000)
    }
}

const lisi = {
    name: 'lisi',
    sayHi() { 
        console.log('this', this);
    },
    wait() { 
        // settimeout 全局对象内置方法 = window.setTimeout
        setTimeout(() => { 
            console.log('settimeout-this-lisi', this)
        }, 1000)
    }
}


function testBind(...args) { 
    console.log('testBind-this', this)
    console.log('args', args)

    return 'change this'
}

const bind = testBind.bind(null, 1, 2, 3);


Function.prototype.mybind = function (...args) { 
    let [newThis, ...res] = args;
    const self = this;
    
    newThis = newThis ? newThis : window;
    newThis = typeof newThis === 'object' ? newThis : Object(newThis);

    newThis.fn = self;
    
    return function (...args) { 
        const allArgs = [...res, ...args];
        const result = newThis.fn(...allArgs);
        delete newThis.fn;
        return result;
    }
    
}

// const mybind = testBind.mybind({x: 200}, 4, 5, 6);
const mybind = testBind.mybind(null, 4, 5, 6);