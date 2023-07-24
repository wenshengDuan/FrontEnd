<!--
 * @Description: 
 * @Author: duanwensheng
 * @Date: 2023-07-23 19:45:53
-->
同步的js脚本 渲染是阻塞页面 是当前的dom 渲染页面暂停
dom 不是一次渲染而是渐进式渲染 当js 阻塞dom 阻塞之前的dom节点还是会被渲染出来
script 默认阻塞执行 阻塞读取并执行
可以通过设置 defer 和 async 属性 使脚本异步执行,但是二者有差异
defer: 延迟到dom 树解析完成后执行脚本
async: 异步并行加载, 加载完立即执行