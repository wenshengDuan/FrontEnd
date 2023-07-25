/*
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-25 10:28:50
 */
String.prototype.trim = function () { 
    return this.replace(/^\s+/, '').replace(/\s+$/, '')
}