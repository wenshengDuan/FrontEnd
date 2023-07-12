/*
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-12 21:25:06
 */
/**
 * @param 
 */

const obj = {
    name: 'mm',
    age: 12,
    address: {
        provice: '湖南',
        city: '长沙'
    }
}

function deepClone(obj = {}) { 
    // 如果是基本类型 则直接返回
    if (typeof obj !== 'object' || obj === null) { 
        return obj;
    }

    // 处理循环引用

    // 处理时间类型
    if (obj instanceof Date) { 
        return new Date(obj)
    }

    // 处理正则类型
    if (obj instanceof RegExp) { 
        return new RegExp(obj)
    }   
    
    // 处理set　map
    if (obj instanceof Set) { 

    }

    if (obj instanceof Map) { 

        
    }
    // Math 不用处理因为结果是个数字类型

    let target = Array.isArray(obj) ? [] : {}



    for (let key in obj) { 
        if (obj.hasOwnProperty(key)) {
            target[key] = deepClone(obj[key])
        }
    } 

    return target;
}


const obj2 = deepClone(obj)

obj2.address.city = '北京'