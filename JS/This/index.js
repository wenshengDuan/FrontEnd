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