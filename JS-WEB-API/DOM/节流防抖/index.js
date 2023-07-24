/*
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-24 11:16:28
 */
const inputDebounce = document.getElementById('debounce');

function startDebounce() {
    let test = 'scope';
    inputDebounce.addEventListener('keyup', debounce((e) => { 
        console.log(e.target.value);
        console.log('test', test);
        console.log('listener-this', this)
    }, 500))
}


// this 指向问题
// 谁调用指向谁 箭头函数指向父级作用域
function debounce(fn, delay = 300) { 
    let timer = null;

    return function (...args) { 
        if (timer) { 
            clearTimeout(timer);
        }

        timer = setTimeout(() => { 
            // 所以 this 还是指向window 
            console.log('this', this)
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}

startDebounce();


const divThrottle = document.getElementById('throttle')

function startThrottle() { 
    divThrottle.addEventListener('drag', throttle(e => { 
        console.log(e.offsetX, e.offsetY)
        console.log('startThrottle-this', this);
    }, 500))
}

function throttle(fn, delay = 100) { 
    let timer = null; 

    return function (...args) { 
        if (timer) return;

        timer = setTimeout(() => { 
            console.log('throttle-this', this);
            fn.apply(this, args)
            timer = null
        }, delay)
    }
}
startThrottle();