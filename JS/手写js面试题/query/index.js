/*
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-25 10:54:55
 */
function query(key) {
    const search = location.search.slice(1);
    const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`, 'i');
    const res = search.match(reg);
    if (!res) { 
        return null;
    }
    return res[2]
}

function queryApi(key) { 
    const search = location.search;
    const q = new URLSearchParams(search);
    return q.get(key);
}