/*
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-12 21:25:06
 */
/**
 * @param 
 */

// const obj = {
//     name: 'mm',
//     age: 12,
//     address: {
//         provice: '湖南',
//         city: '长沙'
//     }
// }

const address = {
    provice: '湖南',
    city: '长沙',
}

// 测试循环引用
const preson = {
    name: 'mm',
    age: 12,
    address: {
        provice: '河北',
        city: '香河',
    },
    list: {}
}

preson.belong = preson;
preson.list.mapList = new Map([['preson', preson]])
preson.list.setList = new Set([preson])


function deepClone(obj = {}, visited = new WeakMap()) { 
    // 如果是基本类型 则直接返回
    if (typeof obj !== 'object' || obj === null) { 
        return obj;
    }

    // 处理循环引用
    if (visited.has(obj)) { 
        return visited.get(obj);
    }

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
        const set = new Set();
        obj.forEach(val => { 
            set.add(deepClone(val, visited))
        })
        visited.set(obj, set)
        return set;
    }

    if (obj instanceof Map) { 
        const map = new Map();
        obj.forEach((val, key) => { 
            map.set(key, deepClone(val, visited))
        })
        visited.set(obj, map)
        return map;
    }
    // Math 不用处理因为结果是个数字类型

    let target = Array.isArray(obj) ? [] : {}
    
    visited.set(obj, target)

    for (let key in obj) { 
        if (obj.hasOwnProperty(key)) {
            target[key] = deepClone(obj[key], visited)
        }
    } 

    return target;
}


const obj2 = deepClone(preson)

obj2.address.city = '北京'