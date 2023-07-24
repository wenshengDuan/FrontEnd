/*
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-20 17:43:56
 */
// const plist = document.querySelectorAll('p')
// plist[1].className = 'red';
// plist[1].style.color = 'red'

// 新建元素
const div = document.getElementById('div');
const pele = document.createElement('p')
pele.innerHTML = '新建p元素'
div.appendChild(pele);

// 移动元素
const p1 = document.getElementsByTagName('p')[0];
div.appendChild(p1);

// 查找父元素
const parentNode = p1.parentNode;
console.log('p1 父元素', parentNode);

// 查找子元素列表 childNodes 返回所有节点信息 children 返回元素节点信息
const childList = div.childNodes;
console.log('子元素列表', childList);

// 删除子元素
div.removeChild(p1)

// 聚合DOM操作
const list = document.getElementById('list');
const frag = document.createDocumentFragment();
for (let i = 0; i < 20; i++) { 
    const li = document.createElement('li');
    li.innerHTML = `插入的第${i}个li－－－`;
    frag.appendChild(li)
}
list.appendChild(frag)