/*
 * @Description:
 * @Author: duanwensheng
 * @Date: 2023-07-24 18:50:44
 */
const obj1 = {
    a: 100,
    b: 200,
    c: {
        set: new Set([1, 3, 5]),
        map: new Map([
            ['key1', 100],
            ['key2', 200]
        ])
    },
    d: [5, 6, 7]
} 

const obj2 = {
    a: 100,
    b: 200,
    c: {
        set: new Set([1, 3, 5]),
        map: new Map([
            ['key1', 100],
            ['key2', 200]
        ])
    },
    d: [5, 6, 7]
}

function isObject(obj) { 
    return typeof obj === 'object' && obj !== null
}

function isSet(obj) {
    return obj instanceof Set;
}

function isMap(obj) {
    return obj instanceof Map;
}

function isMapOrSet(obj) {
    return isSet(obj) || isMap(obj)
}


function isEqual(obj1, obj2) { 
    // 判断如果参数不是对象 则直接对比返回
    if (!isObject(obj1) || !isObject(obj2)) { 
        return obj1 === obj2;
    }

    // 分别处理set map 数据类型
    if (isMapOrSet(obj1) || isMapOrSet(obj2)) { 
        if (isSet(obj1) && isSet(obj2)) { 
           // 转换成数组
            return isEqual([...obj1], [...obj2])
        }

        if (isMap(obj1) && isMap(obj2)) { 
            return isEqual([...obj1], [...obj2])
        }

        return false;
    }

    // 取出对象keys, 判断是否 
    const obj1Keys = Object.keys(obj1);
    const obj2Keys = Object.keys(obj2);

    if (obj1Keys.length !== obj2Keys.length) { 
        return false;
    }

    for (let key in obj1) { 
        // 分别处理set 和 map 特殊的数据类型
        const isSame = isEqual(obj1[key], obj2[key])
        if (!isSame) { 
            return false;
        }
    }

    return true;
}


// isEqual(obj1, obj2)